import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, In, Repository, SelectQueryBuilder} from "typeorm";
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

@Injectable()
export class QuestsService extends ResourceService<Quest, CreateQuestDto, ReadQuestDto, ReadManyQuestsDto, UpdateQuestDto> {
    constructor(
        @InjectRepository(Quest) questRepository: Repository<Quest>,
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(Stage) private stagesRepository: Repository<Stage>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        @InjectRepository(QuestSkill) private questSkillsRepository: Repository<QuestSkill>,
        @InjectMapper() mapper: Mapper,
        // private stagesService: StagesService,
        // private tasksService: TasksService,
    ) {
        super(
            questRepository,
            {
                relations: {questSkills: true},
                sortableColumns: ['deadline'],
                defaultSortBy: [['deadline', 'ASC']],
                filterableColumns: {
                    categoryId: [FilterOperator.EQ],
                    //finishDate: [FilterOperator.NULL],
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

    async create(createDto: CreateQuestDto): Promise<ReadQuestDto> {
        const quest = this.mapper.map(createDto, this.createDtoType, this.entityType); // valid because of dto validation
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

    async readAllForUser(userId: string, query: PaginateQuery): Promise<ReadManyQuestsDto> {
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

        // const quests = await this.repository.createQueryBuilder('quest')
        //     .leftJoinAndSelect('quest.stages', 'stages')
        //     .leftJoinAndSelect('stages.tasks', 'tasks')
        //     .leftJoinAndSelect('quest.questSkills', 'questSkills')
        //     .leftJoinAndSelect('quest.category', 'category')
        //     .where('category.id IN (:...categoryIds)', { categoryIds })
        //     .orderBy('stages.index', 'ASC')
        //     .getMany(); // Sort stages by index in ascending order
        //
        // const total = quests.length;
        // const totalPages = Math.ceil(total / query.limit);
        //
        // const paginatedResponse = {
        //     meta: {
        //         totalPages,
        //         itemsPerPage: 0,
        //         totalItems: 0,
        //         currentPage: 0,
        //     },
        //     data: quests,
        // };
        //
        // return this.mapper.map(paginatedResponse, typeof paginatedResponse, ReadManyQuestsDto);
    }
}
