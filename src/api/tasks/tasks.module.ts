import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { QuestsMapper } from '../quests/quests.mapper';
import { Stage } from '../stages/entities/stage.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksMapper } from './tasks.mapper';
import { TasksService } from './tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Stage, Quest, QuestSkill])],
    controllers: [TasksController],
    providers: [TasksService, TasksMapper, QuestsMapper],
})
export class TasksModule {}
