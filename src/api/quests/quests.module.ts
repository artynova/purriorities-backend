import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { CategoriesMapper } from '../categories/categories.mapper';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsMapper } from '../skills/skills.mapper';
import { SkillsService } from '../skills/skills.service';
import { Stage } from '../stages/entities/stage.entity';
import { StagesMapper } from '../stages/stages.mapper';
import { StagesModule } from '../stages/stages.module';
import { StagesService } from '../stages/stages.service';
import { Task } from '../tasks/entities/task.entity';
import { TasksMapper } from '../tasks/tasks.mapper';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { QuestSkill } from './entities/quest-skill.entity';
import { Quest } from './entities/quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsMapper } from './quests.mapper';
import { QuestsService } from './quests.service';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { Cat } from '../cats/entities/cat.entity';

@Module({
    imports: [
        StagesModule,
        TypeOrmModule.forFeature([Task, Stage, Quest, QuestSkill, Category, Skill, User, CatOwnership, Cat]),
    ],
    controllers: [QuestsController],
    providers: [
        QuestsService,
        StagesService,
        TasksService,
        CategoriesService,
        SkillsService,
        QuestsMapper,
        TasksMapper,
        StagesMapper,
        SkillsMapper,
        CategoriesMapper,
        LogicConfigService,
    ],
})
export class QuestsModule {}
