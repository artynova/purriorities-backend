import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator} from "nestjs-paginate";
import {Stage} from "./stage.entity";
import {CreateStageDto} from "./dtos/create-stage.dto";
import {ReadStageDto} from "./dtos/read-stage.dto";
import {ReadManyStagesDto} from "./dtos/read-many-stages.dto";
import {UpdateStageDto} from "./dtos/update-stage.dto";
import {TasksService} from "../tasks/tasks.service";

@Injectable()
export class StagesService extends ResourceService<Stage, CreateStageDto, ReadStageDto, ReadManyStagesDto, UpdateStageDto> {
    constructor(
        @InjectRepository(Stage) repository: Repository<Stage>,
        @InjectMapper() mapper: Mapper,
        private taskService: TasksService,
    ) {
        super(
            repository,
            {
                sortableColumns: ['index'],
                defaultSortBy: [['index', 'ASC']],
                select: ['id', 'name', 'questId', 'tasks', 'finishDate'],
                filterableColumns: {
                    questId: [FilterOperator.EQ]
                },
            },
            mapper,
            Stage,
            CreateStageDto,
            ReadStageDto,
            ReadManyStagesDto,
            UpdateStageDto,
        );
    }

    // async create(createDto: CreateStageDto): Promise<ReadStageDto> {
    //     const savedStage = this.mapper.map(
    //         await this.repository.save(createDto),
    //         this.entityType,
    //         this.readOneDtoType
    //     );
    //     console.log(savedStage)
    //
    //     for (const task of createDto.tasks) {
    //         const savedTask = await this.taskService.create({
    //             ...task, stageId: savedStage.id
    //         });
    //         console.log(savedTask)
    //     }
    //
    //     return savedStage;
    // }
}
