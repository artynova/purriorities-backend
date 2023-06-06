import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsMapper } from './quests.mapper';
import { QuestsService } from './quests.service';
import {StagesMapper} from "../stages/stages.mapper";
import {SkillsMapper} from "../skills/skills.mapper";
import {QuestSkill} from "./entities/quest-skill.entity";
import {Category} from "../categories/category.entity";
import {Stage} from "../stages/stage.entity";
import {CategoriesMapper} from "../categories/categories.mapper";
import {TasksModule} from "../tasks/tasks.module";
import {StagesModule} from "../stages/stages.module";
import {StagesService} from "../stages/stages.service";
import {TasksService} from "../tasks/tasks.service";
import {Task} from "../tasks/task.entity";

@Module({
    imports: [TasksModule, StagesModule, TypeOrmModule.forFeature([Quest, Stage, Task, QuestSkill, Category])],
    controllers: [QuestsController],
    providers: [QuestsService, StagesService, TasksService, QuestsMapper, StagesMapper, SkillsMapper, CategoriesMapper, ],
})
export class QuestsModule {}
