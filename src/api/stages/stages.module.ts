import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestSkill } from '../quests/entities/quest-skill.entity';
import { Quest } from '../quests/entities/quest.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksMapper } from '../tasks/tasks.mapper';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { Stage } from './entities/stage.entity';
import { StagesController } from './stages.controller';
import { StagesMapper } from './stages.mapper';
import { StagesService } from './stages.service';

@Module({
    imports: [TasksModule, TypeOrmModule.forFeature([QuestSkill, Quest, Stage, Task])],
    controllers: [StagesController],
    providers: [TasksService, StagesService, StagesMapper, TasksMapper],
})
export class StagesModule {}
