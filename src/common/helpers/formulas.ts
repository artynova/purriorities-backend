import { ExpFormula } from '../types/formulas';

// bounded slowing progression
export function boundedProgression(
    base: number,
    limit: number,
    growthRate: number,
    roundingIncrement: number,
): (param: number) => number {
    return (param) => {
        return roundForIncrement(base + (limit - base) * (1 - Math.pow(growthRate, -param + 1)), roundingIncrement);
    };
}

// unbounded accelerating progression
export function exponentialProgression(
    factor: number,
    growthRate: number,
    roundingIncrement: number,
): (param: number) => number {
    return (param: number) => {
        return roundForIncrement(Math.pow(factor * (param - 1), growthRate), roundingIncrement);
    };
}

export function getLevelCap(level: number, expFormula: ExpFormula) {
    return expFormula(level + 1) - expFormula(level);
}

export function roundForIncrement(value: number, increment: number) {
    return Math.round(value / increment) * increment;
}
