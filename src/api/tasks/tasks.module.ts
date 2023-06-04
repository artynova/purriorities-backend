import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";
import {TasksMapper} from "./tasks.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TasksController],
    providers: [TasksService, TasksMapper],
})
export class TasksModule {}