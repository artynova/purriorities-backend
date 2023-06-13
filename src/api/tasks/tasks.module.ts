import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { Cat } from '../cats/entities/cat.entity';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { QuestsMapper } from '../quests/quests.mapper';
import { Skill } from '../skills/entities/skill.entity';
import { Stage } from '../stages/entities/stage.entity';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksMapper } from './tasks.mapper';
import { TasksService } from './tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Stage, Quest, QuestSkill, User, Skill, CatOwnership, Cat])],
    controllers: [TasksController],
    providers: [TasksService, TasksMapper, QuestsMapper],
})
export class TasksModule {}
