import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Stage} from "./stage.entity";
import {StagesController} from "./stages.controller";
import {StagesService} from "./stages.service";
import {StagesMapper} from "./stages.mapper";
import {TasksMapper} from "../tasks/tasks.mapper";
import {Task} from "../tasks/task.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Stage, Task])],
    controllers: [StagesController],
    providers: [StagesService, StagesMapper, TasksMapper],
})
export class StagesModule {}