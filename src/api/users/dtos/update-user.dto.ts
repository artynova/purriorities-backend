import { AutoMap } from '@automapper/classes';
import { IsEmail, IsLocale, IsNotEmpty, IsOptional, IsTimeZone, MinLength } from 'class-validator';

//export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
    @AutoMap()
    @IsOptional()
    @IsNotEmpty()
    nickname?: string;

    @AutoMap()
    @IsOptional()
    @IsEmail()
    email?: string;

    @AutoMap()
    @IsOptional()
    @IsLocale()
    locale?: string;

    @AutoMap()
    @IsOptional()
    @IsTimeZone()
    timezone?: string;

    @AutoMap()
    @IsOptional()
    @MinLength(8)
    password?: string;
}
