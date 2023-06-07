import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @AutoMap()
    @IsNotEmpty({ message: 'Nickname should not be empty' })
    nickname: string;

    @AutoMap()
    @IsNotEmpty()
    //@IsEmail({}, { message: 'Email is invalid' })
    email: string;

    /**
     * Must be a password of minimum length 8.
     * @example WnW9Fyst1x
     */
    @AutoMap()
    @MinLength(8)
    password: string;
}
