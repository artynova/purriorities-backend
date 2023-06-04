import {IsEmail, IsLocale, IsNotEmpty, IsTimeZone, MinLength} from 'class-validator';
import {AutoMap} from "@automapper/classes";

export class CreateUserDto {
    @AutoMap()
    @IsNotEmpty({message: 'Nickname should not be empty'})
    nickname: string;

    @AutoMap()
    @IsEmail({}, {message: 'Email is invalid'})
    email: string;

    @AutoMap()
    @IsLocale({message: 'Locale is invalid'})
    locale: string;

    @AutoMap()
    @IsTimeZone({message: 'Timezone is invalid'})
    timezone: string;

    /**
     * Must be a password of minimum length 8.
     * @example WnW9Fyst1x
     */
    @AutoMap()
    @MinLength(8)
    password: string;
}
