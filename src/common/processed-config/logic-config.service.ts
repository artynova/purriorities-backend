import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { boundedProgression, exponentialProgression } from '../helpers/progression';
import { Lateness, Rarity } from '../types/enums';
import {
    BoostFormula,
    BoostFormulaSettings,
    ExpFormula,
    ExpFormulaSettings,
    PriceFormula,
    PriceFormulaSettings,
} from '../types/formulas';

@Injectable()
export class LogicConfigService {
    constructor(private configService: ConfigService) {}

    editingPenalty(lateness: Lateness) {
        return this.configService.get<number[]>('logic.punishments.changeDeadline')[lateness];
    }

    get mainExpFormula(): ExpFormula {
        const settings = this.configService.get<ExpFormulaSettings>('logic.formulas.userLeveling.main');
        return exponentialProgression(settings.levelFactor, settings.growthRate, settings.roundingIncrement);
    }

    get skillExpFormula(): ExpFormula {
        const settings = this.configService.get<ExpFormulaSettings>('logic.formulas.userLeveling.skill');
        return exponentialProgression(settings.levelFactor, settings.growthRate, settings.roundingIncrement);
    }

    catExpBoostFormula(rarity: Rarity): BoostFormula {
        const settings = this.configService.get<BoostFormulaSettings[]>('logic.catBonuses')[rarity];
        return boundedProgression(settings.base, settings.limit, settings.growthRate, settings.roundingIncrement);
    }

    catReturnPriceFormula(rarity: Rarity): PriceFormula {
        const settings = this.configService.get<PriceFormulaSettings[]>('logic.catReturnPrices')[rarity];
        return boundedProgression(settings.base, settings.limit, settings.growthRate, settings.roundingIncrement);
    }

    get questHistoryLimit() {
        return this.configService.get<number>('logic.historyLimit');
    }
}
