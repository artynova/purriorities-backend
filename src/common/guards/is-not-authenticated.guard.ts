import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest() as Request;
        if (request.isAuthenticated()) throw new BadRequestException('Cannot do this action while logged in');
        return true;
    }
}
