import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Task} from "./task.entity";
import {ReadTaskDto} from "./dtos/read-task.dto";
import {ReadManyTasksDto} from "./dtos/read-many-tasks.dto";
import {CreateTaskDto} from "./dtos/create-task.dto";
import {UpdateTaskDto} from "./dtos/update-task.dto";
import {createPaginatedToReadManyMap} from "../../common/helpers/mapping";


@Injectable()
export class TasksMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Task, ReadTaskDto);
            createPaginatedToReadManyMap(mapper, Task, ReadTaskDto, ReadManyTasksDto);
            createMap(mapper, CreateTaskDto, Task);
            createMap(mapper, UpdateTaskDto, Task);
        };
    }
}