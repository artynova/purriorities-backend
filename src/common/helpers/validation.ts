import { ValidationError } from 'class-validator';

export function buildErrorsString(errors: ValidationError[]): string {
    const errorMessages = errors.map((error) => Object.values(error.constraints)).flat();
    return errorMessages.join('\n');
}
