import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceService } from '../../common/resource-base/resource.service-base';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { Stage } from '../stages/entities/stage.entity';
import { CompleteResponseDto } from './dtos/complete-response.dto';
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
    ) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                select: ['id', 'name', 'minutes', 'stageId', 'finishDate'],
            },
            mapper,
            Task,
            CreateTaskDto,
            ReadTaskDto,
            ReadManyTasksDto,
            UpdateTaskDto,
        );
    }

    async complete(id: string): Promise<CompleteResponseDto> {
        const task = await this.findOneWithUser(id);
        const newQuest = await this.finish(task);
        // TODO rewards
        const response = new CompleteResponseDto();
        return response;
    }

    async refuse(id: string): Promise<RefuseResponseDto> {
        const task = await this.findOneWithUser(id);
        const newQuest = await this.finish(task);
        // TODO punishments and rewards
        const response = new RefuseResponseDto();
        return response;
    }

    private async finish(task: Task): Promise<void> {
        await this.repository.softRemove(task);
        const remainingTasks = await this.repository.findBy({ stageId: task.stageId }); // results do not include soft-deleted (= finished) tasks
        if (remainingTasks.length) return null;
        await this.stageRepository.softRemove(task.stage);
        const remainingStages = await this.stageRepository.findBy({ questId: task.stage.questId });
        if (remainingStages.length) return null;
        await this.questRepository.softRemove(task.stage.quest);
        await this.tryScheduleNext(task.stage.quest);
    }

    private async tryScheduleNext(quest: Quest): Promise<void> {
        if (quest.deadline === null) return null;
        quest.deadline.setDate(quest.deadline.getDate() + quest.interval); // schedule the new copy
        if (quest.limit !== null && quest.limit < quest.deadline) return null;
        const oldQuestId = quest.id;
        quest.id = undefined;
        quest.finishDate = null;
        const savedQuest = await this.questRepository.save(quest);
        await this.saveQuestSkillCopies(savedQuest, oldQuestId);
        await this.saveStageCopies(savedQuest, oldQuestId);
    }

    private async saveQuestSkillCopies(quest: Quest, oldId: string) {
        const questSkills = await this.questSkillRepository.find({ where: { questId: oldId } });
        quest.questSkills = [];
        for (const questSkill of questSkills) {
            questSkill.questId = quest.id;
            const savedQuestSkill = await this.questSkillRepository.save(questSkill);
            quest.questSkills.push(savedQuestSkill);
        }
    }

    private async saveStageCopies(quest: Quest, oldId: string) {
        quest.stages = [];
        const allStages = await this.stageRepository.find({ where: { questId: oldId }, withDeleted: true });
        for (const stage of allStages) {
            const oldStageId = stage.id;
            stage.id = undefined;
            stage.questId = quest.id;
            stage.finishDate = null; // unfinish the copy
            const savedStage = await this.stageRepository.save(stage);
            quest.stages.push(savedStage);
            await this.saveTaskCopies(savedStage, oldStageId);
        }
    }

    private async saveTaskCopies(stage: Stage, oldId: string) {
        stage.tasks = [];
        const allStageTasks = await this.repository.find({ where: { stageId: oldId }, withDeleted: true });
        for (const task of allStageTasks) {
            task.id = undefined;
            task.stageId = stage.id;
            task.finishDate = null; // unfinish the copy
            const savedTask = await this.repository.save(task);
            stage.tasks.push(savedTask);
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
