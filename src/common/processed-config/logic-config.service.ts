import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Lateness } from '../types/enums';

@Injectable()
export class LogicConfigService {
    constructor(private configService: ConfigService) {}

    editingPenalty(lateness: Lateness) {
        return this.configService.get<number[]>('logic.punishments.changeDeadline')[lateness];
    }

    get questHistoryLimit() {
        return this.configService.get<number>('logic.historyLimit');
    }
}
