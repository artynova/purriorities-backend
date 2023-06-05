import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from './quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsMapper } from './quests.mapper';
import { QuestsService } from './quests.service';

@Module({
    imports: [TypeOrmModule.forFeature([Quest])],
    controllers: [QuestsController],
    providers: [QuestsService, QuestsMapper],
})
export class QuestsModule {}
