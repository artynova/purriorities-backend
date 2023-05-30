import { Lateness } from '../enums/lateness.enum';

export const LATE_EDITING_BOUND_DAYS = 7;
// to avoid relying on hard-coding punishments in different locations
export const LATENESS_TO_TRUST_LOSS = new Map<Lateness, number>([
    [Lateness.EARLY, 0],
    [Lateness.LATE, 1],
    [Lateness.OVERDUE, 2],
]);
