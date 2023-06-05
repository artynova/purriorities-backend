import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

const CONSTRAINTS_CODES_TO_MESSAGES = {
    '23000': "Violation of application's constraints",
    '23001': 'Attempt to delete an entity without deleting dependent entities',
    '23502': 'Null value is not allowed here',
    '23503': 'Malformed relationship reference',
    '23505': 'Input overlaps with existing values',
    '23514': "Violation of application's constraints",
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        if (exception instanceof QueryFailedError) {
            const message = CONSTRAINTS_CODES_TO_MESSAGES[exception.driverError['code']];
            super.catch(new BadRequestException(message), host);
        }
        super.catch(exception, host);
    }
}
