import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quest } from '../../api/quests/entities/quest.entity';
import { CleanupService } from './cleanup.service';

@Module({ imports: [TypeOrmModule.forFeature([Quest])], providers: [CleanupService] })
export class CleanupModule {}
