import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AccountDto } from './dtos/account.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectMapper() private readonly mapper: Mapper,
    ) {}

    async validateAccount(email: string, password: string): Promise<AccountDto> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new UnauthorizedException(`Account for ${email} does not exist`);
        }
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            throw new UnauthorizedException('Invalid password');
        }
        return this.mapper.map(user, User, AccountDto);
    }

    async readAccount(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new UnauthorizedException(`Account for ${email} does not exist`);
        }
        return this.mapper.map(user, User, AccountDto);
    }
}
