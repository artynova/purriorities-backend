export type ExpFormula = (level: number) => number;
export type BoostFormula = (level: number) => number;
export type PriceFormula = (level: number) => number;

export type ExpFormulaSettings = {
    levelFactor: number;
    growthRate: number;
    roundingIncrement: number;
};

export type BoostFormulaSettings = {
    base: number;
    limit: number;
    growthRate: number;
    roundingIncrement: number;
};

export type PriceFormulaSettings = BoostFormulaSettings;
