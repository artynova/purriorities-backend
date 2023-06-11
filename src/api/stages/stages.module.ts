import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Stage} from "./stage.entity";
import {StagesController} from "./stages.controller";
import {StagesService} from "./stages.service";
import {StagesMapper} from "./stages.mapper";
import {TasksMapper} from "../tasks/tasks.mapper";
import {Task} from "../tasks/task.entity";
import {TasksService} from "../tasks/tasks.service";
import {TasksModule} from "../tasks/tasks.module";
import {Quest} from "../quests/entities/quest.entity";
import {QuestSkill} from "../quests/entities/quest-skill.entity";

@Module({
    imports: [TasksModule, TypeOrmModule.forFeature([QuestSkill, Quest, Stage, Task])],
    controllers: [StagesController],
    providers: [TasksService, StagesService, StagesMapper, TasksMapper],
})
export class StagesModule {}