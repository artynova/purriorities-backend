import { PickType } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, ['nickname', 'email', 'locale', 'timezone']) {
    /**
     * Must be a strong password.
     * @example WnW9Fyst1x
     */
    @IsStrongPassword()
    password: string;
}
