import { PickType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserCreateDto extends PickType(User, ['nickname', 'email', 'locale', 'timezone']) {
    @MinLength(12)
    password: string;
}
