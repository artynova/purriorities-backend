import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { boundedProgression, exponentialProgression } from '../helpers/formulas';
import { weightedRandom } from '../helpers/random';
import { Lateness, Priority, Rarity } from '../types/enums';
import {
    BoostFormula,
    BoostFormulaSettings,
    ExpFormula,
    ExpFormulaSettings,
    PriceFormula,
    PriceFormulaSettings,
} from '../types/formulas';
import { CaseSettings } from '../types/random';

@Injectable()
export class LogicConfigService {
    constructor(private configService: ConfigService) {}

    get mainExpFormula(): ExpFormula {
        const settings = this.configService.get<ExpFormulaSettings>('logic.formulas.userLeveling.main');
        return exponentialProgression(settings.levelFactor, settings.growthRate, settings.roundingIncrement);
    }

    get skillExpFormula(): ExpFormula {
        const settings = this.configService.get<ExpFormulaSettings>('logic.formulas.userLeveling.skill');
        return exponentialProgression(settings.levelFactor, settings.growthRate, settings.roundingIncrement);
    }

    catExpBoostFormula(rarity: Rarity): BoostFormula {
        const settings = this.configService.get<BoostFormulaSettings[]>('logic.formulas.catBoosts')[rarity];
        return boundedProgression(settings.base, settings.limit, settings.growthRate, settings.roundingIncrement);
    }

    catReturnPriceFormula(rarity: Rarity): PriceFormula {
        const settings = this.configService.get<PriceFormulaSettings[]>('logic.formulas.catReturnPrices')[rarity];
        return boundedProgression(settings.base, settings.limit, settings.growthRate, settings.roundingIncrement);
    }

    get questHistoryLimit() {
        return this.configService.get<number>('logic.historyLimit');
    }

    get commonCaseSettings(): CaseSettings {
        return this.configService.get<CaseSettings>('logic.cases.common');
    }

    get legendaryCaseSettings(): CaseSettings {
        return this.configService.get<CaseSettings>('logic.cases.legendary');
    }

    commonCaseRandomRarity() {
        return this.caseRandomRarity(this.commonCaseSettings);
    }

    legendaryCaseRandomRarity() {
        return this.caseRandomRarity(this.legendaryCaseSettings);
    }

    private caseRandomRarity(caseSettings: CaseSettings) {
        const commonPercentage = 100 - caseSettings.rarePercentage - caseSettings.legendaryPercentage;
        return weightedRandom([
            { option: Rarity.COMMON, weight: commonPercentage },
            { option: Rarity.RARE, weight: caseSettings.rarePercentage },
            { option: Rarity.LEGENDARY, weight: caseSettings.legendaryPercentage },
        ]);
    }

    get valuableMinutesCap() {
        return this.configService.get<number>('logic.rewards.valuableMinutesCap');
    }

    feedPerMinute(priority: Priority) {
        return this.configService.get<number[]>('logic.rewards.feedPerMinute')[priority];
    }

    trustPerTask(priority: Priority) {
        return this.configService.get<number[]>('logic.rewards.trustPerTask')[priority];
    }

    mainExpPerMinute(priority: Priority) {
        return this.configService.get<number[]>('logic.rewards.mainExpPerMinute')[priority];
    }

    get skillExpPerMinute() {
        return this.configService.get<number>('logic.rewards.skillExpPerMinute');
    }

    get minorSkillFactor() {
        return this.configService.get<number>('logic.rewards.minorSkillFactor');
    }

    get catnipPerMainLevel() {
        return this.configService.get<number>('logic.rewards.catnipPerMainLevel');
    }

    get catnipPerSkillLevel() {
        return this.configService.get<number>('logic.rewards.catnipPerSkillLevel');
    }

    refuseTaskTrust(lateness: Lateness) {
        return this.configService.get<number[]>('logic.punishments.refuseTaskTrust')[lateness];
    }

    runawayFeedLossFactor(rarity: Rarity) {
        return this.configService.get<number[]>('logic.punishments.runawayFeedLossFactor')[rarity];
    }

    missDeadlineTrust(priority: Priority) {
        return this.configService.get<number[]>('logic.punishments.missDeadlineTrust')[priority];
    }
}
