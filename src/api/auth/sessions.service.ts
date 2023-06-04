import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
    constructor(@InjectRepository(Session) public readonly repository) {}
}
