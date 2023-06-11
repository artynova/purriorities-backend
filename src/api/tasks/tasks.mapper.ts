import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createPaginatedToReadManyMap } from '../../common/helpers/mapping';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ReadManyTasksDto } from './dtos/read-many-tasks.dto';
import { ReadTaskDto } from './dtos/read-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './entities/task.entity';

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
