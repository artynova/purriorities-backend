import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quest } from '../../api/quests/entities/quest.entity';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';

@Injectable()
export class CleanupService {
    constructor(
        @InjectRepository(Quest) private questRepository: Repository<Quest>,
        private readonly logicConfigService: LogicConfigService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async cleanup() {
        const now = new Date();
        const threshold = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - this.logicConfigService.questHistoryLimit,
        );
        await this.questRepository
            .createQueryBuilder()
            .withDeleted()
            .where('finishDate < :threshold', { threshold })
            .delete()
            .execute();
    }
}
