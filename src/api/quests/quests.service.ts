import {ForbiddenException, Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, FindOneOptions, In, Not, Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, paginate, PaginateConfig, Paginated, PaginateQuery} from "nestjs-paginate";
import {Quest} from "./entities/quest.entity";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {Stage} from "../stages/stage.entity";
import {Task} from "../tasks/task.entity";
import {Category} from "../categories/category.entity";
import {QuestSkill} from "./entities/quest-skill.entity";
import {TasksService} from "../tasks/tasks.service";
import {StagesService} from "../stages/stages.service";
import {Skill} from "../skills/skill.entity";

@Injectable()
export class QuestsService extends ResourceService<Quest, CreateQuestDto, ReadQuestDto, ReadManyQuestsDto, UpdateQuestDto> {
    constructor(
        @InjectRepository(Quest) questRepository: Repository<Quest>,
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(Stage) private stagesRepository: Repository<Stage>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        @InjectRepository(QuestSkill) private questSkillsRepository: Repository<QuestSkill>,
        @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
        @InjectMapper() mapper: Mapper,
        private stagesService: StagesService,
        private tasksService: TasksService,
    ) {
        super(
            questRepository,
            {
                relations: {questSkills: true},
                sortableColumns: ['deadline'],
                defaultSortBy: [['deadline', 'ASC']],
                filterableColumns: {
                    categoryId: [FilterOperator.EQ],
                    finishDate: [FilterOperator.NULL],
                    'questSkills.(skillId)': [FilterOperator.EQ]
                },
            },
            mapper,
            Quest,
            CreateQuestDto,
            ReadQuestDto,
            ReadManyQuestsDto,
            UpdateQuestDto,
        );
    }


    private authorize(expectedUserId: string, actualUserId: string, errorMsg?: string) {
        if (expectedUserId !== actualUserId) throw new ForbiddenException(
            errorMsg ?? 'Cannot access and modify someone else\'s quests'
        );
    }

    private async authorizeQuest(questId: string, userId: string) {
        const category = await this.categoriesRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.quests', 'q')
            .where('q.id=:questId', {questId})
            .getOne();

        this.authorize(category.userId, userId);
    }

    private async authorizeCategory(categoryId: string, userId: string) {
        const category = await this.categoriesRepository.findOneOrFail({
            select: {userId: true},
            where: {id: categoryId}
        });

        this.authorize(category.userId, userId, "Cannot access someone else's categories");
    }

    private async authorizeSkill(skillId: string, userId) {
        const skill = await this.skillsRepository.findOneOrFail({
            select: {userId: true},
            where: {id: skillId}
        })

        this.authorize(skill.userId, userId, "Cannot access someone else's skills");
    }

    async create(createDto: CreateQuestDto, userId?: string): Promise<ReadQuestDto> {
        await this.authorizeCategory(createDto.categoryId, userId);

        for (const skillId of createDto.skills) {
            await this.authorizeSkill(skillId, userId);
        }

        const quest = this.mapper.map(createDto, this.createDtoType, this.entityType);
        const savedQuest = this.mapper.map(await this.repository.save(quest), this.entityType, this.readOneDtoType)
        //console.log(createDto)

        for (let i = 0; i < createDto.stages.length; i++) {
            const stage = createDto.stages[i];
            const savedStage = await this.stagesRepository.save({
                ...stage, questId: savedQuest.id, index: i
            });
            //console.log(savedStage)

            for (const task of stage.tasks) {
                const savedTask = await this.tasksRepository.save({
                    ...task, stageId: savedStage.id
                });
                //console.log(savedTask)
            }
        }

        for (let i = 0; i < createDto.skills.length; i++) {
            const skillId = createDto.skills[i];
            const savedSkill = await this.questSkillsRepository.save({
                questId: quest.id,
                skillId: skillId,
                index: i,
            });

            //console.log(savedSkill)
        }

        //TODO should it also return all the new tasks and stages?
        return savedQuest;
    }

    async readAll(query: PaginateQuery, userId: string): Promise<ReadManyQuestsDto> {
        const categoriesOfCurrentUser = await this.categoriesRepository.createQueryBuilder('c')
            .where('c.userId=:userId', {userId})
            .getMany();

        const categoryIds = categoriesOfCurrentUser.map((category => category.id));

        const queryOptions: FindManyOptions<Quest> = {
            where: {
                category: {id: In(categoryIds)}
            },
            relations: {
                stages: {
                    tasks: true,
                },
                questSkills: {skill: true},
                category: true,
            },
        };

        return this.mapper.map(
            await paginate(
                query,
                this.repository,
                {...this.paginateConfig, ...queryOptions} as PaginateConfig<Quest>
            ),
            Paginated<Quest>,
            ReadManyQuestsDto,
        );
    }

    async readOne(id: string, userId: string): Promise<ReadQuestDto> {
        await this.authorizeQuest(id, userId);

        const queryOptions: FindOneOptions<Quest> = {
            where: { id },
            relations: {
                stages: {
                    tasks: true,
                },
                questSkills: {skill: true},
                category: true,
            },
        };

        return this.mapper.map(
            await this.repository.findOneOrFail(queryOptions),
            Quest,
            ReadQuestDto
        );
    }

    async update(id: string, updateDto: UpdateQuestDto, userId: string): Promise<ReadQuestDto> {
        await this.authorizeQuest(id, userId);

        //TODO finish this method!!!!!!!!!!!!!!!!!!1

        // const quest = this.mapper.map(updateDto, this.updateDtoType, this.entityType);
        // const updatedQuest = await super.update(id, updateDto);
        // console.log(updatedQuest)
        //
        // for (let i = 0; i < updateDto.stages.length; i++) {
        //     const stage = updateDto.stages[i];
        //     const updatedStage = await this.stagesService.update(stage.id, {...stage, index: i});
        //     console.log(updatedStage)
        //
        //     for (const task of stage.tasks) {
        //         const updatedTask = await this.tasksService.update(task.id, task);
        //         console.log(updatedTask)
        //     }
        // }
        //
        // const skillIds = updatedQuest.skills.map(skill => skill.id);
        // await this.questSkillsRepository.remove(
        //     await this.questSkillsRepository.find({
        //         where: {
        //             questId: updatedQuest.id,
        //             skillId: Not(In(skillIds)),
        //         }
        //     })
        // );
        //
        // for (let i = 0; i < updateDto.skills.length; i++) {
        //     const skillId = updateDto.skills[i];
        //     const updatedSkill = await this.questSkillsRepository.save({
        //         questId: quest.id,
        //         skillId: skillId,
        //         index: i,
        //     });
        //     console.log(updatedSkill)
        // }
        //
        // return updatedQuest;

        return super.update(id, updateDto);
    }

    async delete(id: string, userId: string): Promise<ReadQuestDto> {
        await this.authorizeQuest(id, userId);

        return super.delete(id);
    }
}
