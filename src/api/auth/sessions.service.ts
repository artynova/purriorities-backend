import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonContains, Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
    constructor(@InjectRepository(Session) public readonly repository: Repository<Session>) {}

    async fullLogout(email: string) {
        const sessions = await this.repository.find({
            where: { json: JsonContains({ passport: { user: email } }) },
        });
        for (const session of sessions) {
            await this.repository.softRemove(session);
        }
    }
}
