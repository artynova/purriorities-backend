import { LevelBaseExpFormula } from '../types/formulas';

export function getLevelCap(level: number, expFormula: LevelBaseExpFormula) {
    return expFormula(level + 1) - expFormula(level);
}
