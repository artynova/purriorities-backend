import {Inject, Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, paginate, PaginateConfig, Paginated, PaginateQuery} from "nestjs-paginate";
import {Quest} from "./entities/quest.entity";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {StagesService} from "../stages/stages.service";
import {TasksService} from "../tasks/tasks.service";
import {Stage} from "../stages/stage.entity";
import {Task} from "../tasks/task.entity";

@Injectable()
export class QuestsService extends ResourceService<Quest, CreateQuestDto, ReadQuestDto, ReadManyQuestsDto, UpdateQuestDto> {
    constructor(
        @InjectRepository(Quest) questRepository: Repository<Quest>,
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(Stage) private stagesRepository: Repository<Stage>,
        @InjectMapper() mapper: Mapper,
        // private stagesService: StagesService,
        // private tasksService: TasksService,
    ) {
        super(
            questRepository,
            {
                sortableColumns: ['deadline'],
                defaultSortBy: [['deadline', 'ASC']],
                filterableColumns: {
                    "category.(user.(id))": [FilterOperator.EQ],
                    categoryId: [FilterOperator.EQ],
                    finishDate: [FilterOperator.NULL],
                    //"questSkills.(id)": [FilterOperator.EQ]
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

        //TODO should it also return all the new tasks and stages?
        return savedQuest;
    }

    async readAllForUser(userId: string, query: PaginateQuery): Promise<ReadManyQuestsDto> {
        const queryOptions: FindManyOptions = {
            where: {
                category: {
                    //TODO
                    //userId: userId
                    id: '5aaf5265-c75b-446d-8fe9-af388074dcc6'
                },
            },
            relations: {
                stages: {tasks: true},
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
}
