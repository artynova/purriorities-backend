import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dtos/create-task.dto";
import {ReadTaskDto} from "./dtos/read-task.dto";
import {ReadManyTasksDto} from "./dtos/read-many-tasks.dto";
import {UpdateTaskDto} from "./dtos/update-task.dto";
import {FilterOperator} from "nestjs-paginate";

@Injectable()
export class TasksService extends ResourceService<Task, CreateTaskDto, ReadTaskDto, ReadManyTasksDto, UpdateTaskDto> {
    constructor(@InjectRepository(Task) repository: Repository<Task>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                select: ['id', 'name', 'minutes', 'stageId', 'finishDate'],
                filterableColumns: {
                    stageId: [FilterOperator.EQ]
                },
            },
            mapper,
            Task,
            CreateTaskDto,
            ReadTaskDto,
            ReadManyTasksDto,
            UpdateTaskDto,
        );
    }
}
