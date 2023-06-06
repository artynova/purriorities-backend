import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './entities/quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsMapper } from './quests.mapper';
import { QuestsService } from './quests.service';
import {StagesMapper} from "../stages/stages.mapper";
import {SkillsMapper} from "../skills/skills.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Quest])],
    controllers: [QuestsController],
    providers: [QuestsService, QuestsMapper, StagesMapper, SkillsMapper],
})
export class QuestsModule {}
