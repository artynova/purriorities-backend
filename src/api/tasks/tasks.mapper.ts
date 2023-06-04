import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Task} from "./task.entity";
import {ReadTaskDto} from "./dtos/read-task.dto";
import {Paginated} from "nestjs-paginate";
import {ReadManyTasksDto} from "./dtos/read-many-tasks.dto";
import {CreateTaskDto} from "./dtos/create-task.dto";
import {UpdateTaskDto} from "./dtos/update-task.dto";


@Injectable()
export class TasksMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Task, ReadTaskDto);
            createMap(mapper, Paginated<Task>, ReadManyTasksDto);
            createMap(mapper, CreateTaskDto, Task);
            createMap(mapper, UpdateTaskDto, Task);
        };
    }
}