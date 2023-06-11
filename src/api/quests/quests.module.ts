import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesMapper } from '../categories/categories.mapper';
import { Category } from '../categories/entities/category.entity';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsMapper } from '../skills/skills.mapper';
import { Stage } from '../stages/entities/stage.entity';
import { StagesMapper } from '../stages/stages.mapper';
import { StagesModule } from '../stages/stages.module';
import { StagesService } from '../stages/stages.service';
import { Task } from '../tasks/entities/task.entity';
import { TasksMapper } from '../tasks/tasks.mapper';
import { TasksService } from '../tasks/tasks.service';
import { QuestSkill } from './entities/quest-skill.entity';
import { Quest } from './entities/quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsMapper } from './quests.mapper';
import { QuestsService } from './quests.service';

@Module({
    imports: [StagesModule, TypeOrmModule.forFeature([Task, Stage, Quest, QuestSkill, Category, Skill])],
    controllers: [QuestsController],
    providers: [
        QuestsService,
        StagesService,
        TasksService,
        QuestsMapper,
        TasksMapper,
        StagesMapper,
        SkillsMapper,
        CategoriesMapper,
    ],
})
export class QuestsModule {}
