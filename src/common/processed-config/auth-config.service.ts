import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
    constructor(private configService: ConfigService) {}

    get saltRounds(): number {
        return this.configService.get<number>('auth.saltRounds');
    }

    get cookieSecret(): string {
        return this.configService.get<string>('auth.cookieSecret');
    }

    get sessionTtl(): number {
        return this.configService.get<number>('auth.sessionTtl');
    }

    get sessionCleanupLimit(): number {
        return this.configService.get<number>('auth.sessionCleanupLimit');
    }
}
