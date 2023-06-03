import { PickType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['nickname', 'email', 'locale', 'timezone']) {
    /**
     * Must be a password of minimum length 8.
     * @example WnW9Fyst1x
     */
    @MinLength(8)
    password: string;
}
