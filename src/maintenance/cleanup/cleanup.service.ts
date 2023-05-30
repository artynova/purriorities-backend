import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quest } from '../../api/quests/quest.entity';
import { HISTORY_LIMIT_DAYS } from '../../common/constants/app-settings';

@Injectable()
export class CleanupService {
    constructor(@InjectRepository(Quest) private questRepository: Repository<Quest>) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async cleanup() {
        const now = new Date();
        const threshold = new Date(now.getFullYear(), now.getMonth(), now.getDate() - HISTORY_LIMIT_DAYS);
        await this.questRepository
            .createQueryBuilder()
            .withDeleted()
            .where('finishDate < :threshold', { threshold })
            .delete()
            .execute();
    }
}
