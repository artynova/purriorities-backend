import { Lateness } from '../enums/lateness.enum';

export function getEditingLateness(setDate: Date, deadlineDate: Date, editDate: Date) {
    if (editDate > deadlineDate) return Lateness.OVERDUE;
}

export function getLateThreshold(setDate: Date, deadlineDate: Date) {
    const unconstrained = new Date(deadlineDate.getTime() - (deadlineDate.getTime() - setDate.getTime() * 0.25));
    const constrained = new Date(deadlineDate);
    constrained.setDate(constrained.getDate() - 7);
    if (constrained < unconstrained) return constrained;
    return unconstrained;
}
