import { WeightedOption } from '../types/random';

export function randomIntInBounds(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Element weights are uniform.
 */
export function randomFromArray<T>(array: T[]) {
    const num = randomIntInBounds(0, array.length - 1);
    return array[num];
}

export function weightedRandom<T>(options: WeightedOption<T>[]): T {
    let weightSum = 0;
    for (const option of options) {
        weightSum += option.weight;
    }

    const num = randomIntInBounds(1, weightSum);

    let cumulative = 0;
    for (const option of options) {
        cumulative += option.weight;
        if (num <= cumulative) return option.option; // num within designated weight range of given option; is eventually true since eventually weightSum is reached, and num is guaranteed to be <= weightSum
    }
    return null;
}
