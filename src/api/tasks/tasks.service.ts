import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subtractTrustToday } from '../../common/helpers/punishment';
import { addExperienceProper, getCompletedMinutes, getExpBoost, taskFeedReward } from '../../common/helpers/rewards';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Stage } from '../stages/entities/stage.entity';
import { RewardDto, SkillRewardDto } from '../users/dtos/reward.dto';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ReadManyTasksDto } from './dtos/read-many-tasks.dto';
import { ReadTaskDto } from './dtos/read-task.dto';
import { RefuseResponseDto } from './dtos/refuse-response.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService extends ResourceService<Task, CreateTaskDto, ReadTaskDto, ReadManyTasksDto, UpdateTaskDto> {
    constructor(
        @InjectRepository(Task) repository: Repository<Task>,
        @InjectMapper() mapper: Mapper,
        @InjectRepository(Stage) private readonly stageRepository: Repository<Stage>,
        @InjectRepository(Quest) private readonly questRepository: Repository<Quest>,
        @InjectRepository(QuestSkill) private readonly questSkillRepository: Repository<QuestSkill>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Skill) private readonly skillRepository: Repository<Skill>,
        @InjectRepository(CatOwnership) private readonly catOwnershipRepository: Repository<CatOwnership>,
        private readonly logicConfig: LogicConfigService,
    ) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                //select: ['id', 'name', 'minutes', 'stageId', 'finishDate'],
            },
            mapper,
            Task,
            CreateTaskDto,
            ReadTaskDto,
            ReadManyTasksDto,
            UpdateTaskDto,
        );
    }

    async complete(id: string): Promise<RewardDto> {
        const task = await this.findOneWithUser(id);
        task.completed = true;
        await this.repository.save(task);

        const quest = task.stage.quest;
        const user = quest.category.user;
        const reward = new RewardDto();

        reward.feedGained += taskFeedReward(task, this.logicConfig);
        user.feed += reward.feedGained;
        reward.trustGained += Math.min(100 - user.trust, this.logicConfig.trustPerTask(quest.priority));
        user.trust += reward.trustGained;

        const questCompleted = await this.finish(task);
        if (questCompleted) {
            await this.processQuestCompletion(quest, reward);
        }
        user.catnip += reward.catnipGained;

        await this.userRepository.save(user);
        return reward;
    }

    async refuse(id: string): Promise<RefuseResponseDto> {
        const task = await this.findOneWithUser(id);
        task.completed = false;
        await this.repository.save(task);

        const quest = task.stage.quest;
        const user = await this.findUserWithCats(quest.category.userId);
        const response = new RefuseResponseDto();

        response.punishment.extraTrustLost = this.logicConfig.refuseTaskTrust(quest.lateness);
        const runaway = subtractTrustToday(response.punishment.extraTrustLost, user, this.logicConfig);
        if (runaway) response.punishment.runawayCats.push(runaway);

        const questCompleted = await this.finish(task);
        if (questCompleted) {
            await this.processQuestCompletion(quest, response.reward);
        }
        user.catnip += response.reward.catnipGained;

        const catOwnerships = user.catOwnerships;
        user.catOwnerships = undefined;
        await this.userRepository.save(user);
        for (const catOwnership of catOwnerships) await this.catOwnershipRepository.save(catOwnership);
        return response;
    }

    private async processQuestCompletion(questWithUser: Quest, reward: RewardDto) {
        const user = questWithUser.category.user; // acquire reference to the user that is beind modified by the operation
        const fullQuest = await this.findFullQuest(questWithUser.id);

        const completedMinutes = Math.min(getCompletedMinutes(fullQuest), this.logicConfig.valuableMinutesCap);
        const expBoost = getExpBoost(fullQuest.category.user.catOwnerships, this.logicConfig);
        const mainExpPerMinute = this.logicConfig.mainExpPerMinute(fullQuest.priority);
        reward.mainLevelExpGained += (completedMinutes * mainExpPerMinute * (100 + expBoost)) / 100;

        const levelsGained = addExperienceProper(reward.mainLevelExpGained, user, this.logicConfig.mainExpFormula);
        reward.catnipGained += levelsGained * this.logicConfig.catnipPerMainLevel;

        await this.processQuestSkills(fullQuest.questSkills, completedMinutes, reward);
        await this.tryScheduleNext(fullQuest);
    }

    private async findUserWithCats(id: string) {
        return this.userRepository.findOne({
            where: { id },
            relations: {
                catOwnerships: { cat: true },
            },
        });
    }

    private async findFullQuest(id: string) {
        return this.questRepository.findOne({
            where: { id },
            relations: {
                stages: { tasks: true },
                questSkills: { skill: true },
                category: { user: { catOwnerships: { cat: true } } },
            },
            withDeleted: true,
        });
    }

    private async processQuestSkills(questSkills: QuestSkill[], questCompletedMinutes: number, reward: RewardDto) {
        if (questSkills.length === 0) return;

        const totalSkillReward = questCompletedMinutes * this.logicConfig.skillExpPerMinute;
        const minorSkillReward = totalSkillReward * this.logicConfig.minorSkillFactor;
        const minorSkillsNum = Math.min(questSkills.length - 1, this.logicConfig.maxMinorSkills);

        for (const questSkill of questSkills) {
            // primary skill is at 0, so last minor skill has minorSkillsNum index and anything after that is not rewarded
            if (questSkill.index > minorSkillsNum) continue;
            const skill = questSkill.skill;
            const skillReward = new SkillRewardDto();
            skillReward.id = questSkill.skillId;

            if (questSkill.index === 0)
                skillReward.levelExpGained = totalSkillReward - minorSkillReward * minorSkillsNum;
            else skillReward.levelExpGained = minorSkillReward;
            reward.skillRewards.push(skillReward);

            const skillLevelsGained = addExperienceProper(
                skillReward.levelExpGained,
                skill,
                this.logicConfig.skillExpFormula,
            );
            reward.catnipGained += skillLevelsGained * this.logicConfig.catnipPerSkillLevel;

            await this.skillRepository.save(skill);
        }
    }

    /**
     * @returns whether finishing the task also finished the quest
     */
    private async finish(task: Task): Promise<boolean> {
        await this.repository.softRemove(task);
        const remainingTasks = await this.repository.findBy({ stageId: task.stageId }); // results do not include soft-deleted (= finished) tasks
        if (remainingTasks.length) return false;
        await this.stageRepository.softRemove(task.stage);
        const remainingStages = await this.stageRepository.findBy({ questId: task.stage.questId });
        if (remainingStages.length) return false;
        await this.questRepository.softRemove(task.stage.quest);
        return true;
    }

    private async tryScheduleNext(fullQuest: Quest): Promise<void> {
        if (fullQuest.deadline === null || fullQuest.interval === null) return;
        fullQuest.deadline.setDate(fullQuest.deadline.getDate() + fullQuest.interval); // schedule the new copy
        if (fullQuest.limit !== null && fullQuest.limit < fullQuest.deadline) return;
        fullQuest.id = undefined;
        fullQuest.finished = undefined;
        fullQuest.finishDate = null;
        const questSkills = fullQuest.questSkills;
        fullQuest.questSkills = null;
        const stages = fullQuest.stages;
        fullQuest.stages = null; // fix for very weird behaviour: typeorm cascade-updates relations, but does not cascade-create them, so it is necessary to manually remember the stages array and save the quest without stages temporarily
        const savedQuest = await this.questRepository.save(fullQuest);
        await this.saveQuestSkillCopies(savedQuest.id, questSkills);
        await this.saveStageCopies(savedQuest.id, stages);
    }

    private async saveQuestSkillCopies(questId: string, questSkills: QuestSkill[]) {
        for (const questSkill of questSkills) {
            questSkill.questId = questId;
            await this.questSkillRepository.save(questSkill);
        }
    }

    private async saveStageCopies(questId: string, stages: Stage[]) {
        for (const stage of stages) {
            stage.id = undefined;
            stage.questId = questId;
            stage.finishDate = null; // unfinish the copy
            const tasks = stage.tasks;
            stage.tasks = null; // same trick as above
            const savedStage = await this.stageRepository.save(stage);
            await this.saveTaskCopies(savedStage.id, tasks);
        }
    }

    private async saveTaskCopies(stageId: string, tasks: Task[]) {
        for (const task of tasks) {
            task.id = undefined;
            task.stageId = stageId;
            task.finishDate = null; // unfinish the copy
            task.completed = null;
            await this.repository.save(task);
        }
    }

    async validateOwner(id: string, userId: string) {
        const task = await this.findOneWithUser(id);
        if (task.stage.quest.category.user.id !== userId)
            throw new ForbiddenException("Cannot access someone else's task");
    }

    private async findOneWithUser(id: string): Promise<Task> {
        const task = await this.repository.findOne({
            where: { id },
            relations: { stage: { quest: { category: { user: true } } } },
        });
        if (!task) throw new NotFoundException('Task does not exist');
        return task;
    }
}
