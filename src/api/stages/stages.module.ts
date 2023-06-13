import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { Cat } from '../cats/entities/cat.entity';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksMapper } from '../tasks/tasks.mapper';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { Stage } from './entities/stage.entity';
import { StagesMapper } from './stages.mapper';

@Module({
    imports: [TasksModule, TypeOrmModule.forFeature([QuestSkill, Quest, Stage, Task, User, Skill, CatOwnership, Cat])],
    providers: [TasksService, StagesMapper, TasksMapper],
})
export class StagesModule {}
