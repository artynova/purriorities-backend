export type ExpFormula = (level: number) => number;
export type BonusFormula = (level: number) => number;
export type PriceFormula = (level: number) => number;

export type ExpFormulaSettings = {
    levelFactor: number;
    growthRate: number;
    roundingIncrement: number;
};

export type BonusFormulaSettings = {
    base: number;
    limit: number;
    growthRate: number;
    roundingIncrement: number;
};

export type PriceFormulaSettings = BonusFormulaSettings;
