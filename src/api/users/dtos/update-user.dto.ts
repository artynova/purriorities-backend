import {AutoMap} from "@automapper/classes";
import {IsEmail, IsLocale, IsNotEmpty, IsOptional, IsTimeZone, MinLength} from "class-validator";

//export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
    @AutoMap()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    @IsOptional()
    nickname?: string;

    @AutoMap()
    @IsEmail()
    @IsOptional()
    email?: string;

    @AutoMap()
    @IsLocale()
    @IsOptional()
    locale?: string;

    @AutoMap()
    @IsTimeZone()
    @IsOptional()
    timezone?: string;

    @AutoMap()
    @MinLength(8)
    password?: string;
}