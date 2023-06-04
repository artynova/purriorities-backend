import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AccountDto } from './dtos/account.dto';

@Injectable()
export class AccountsSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async serializeUser(user: User, done: (err: Error, email: string) => Promise<void>) {
        console.log(user);
        done(null, user.email);
    }

    async deserializeUser(username: string, done: (err: Error, account: AccountDto) => Promise<void>) {
        try {
            const user = await this.authService.readAccount(username);
            done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
}
