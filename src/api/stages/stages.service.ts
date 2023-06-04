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

@Injectable()
export class StagesService extends ResourceService<Stage, CreateStageDto, ReadStageDto, ReadManyStagesDto, UpdateStageDto> {
    constructor(@InjectRepository(Stage) repository: Repository<Stage>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: [],
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
}
