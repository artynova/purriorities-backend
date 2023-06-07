import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

//export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
    @AutoMap()
    @IsOptional()
    @IsNotEmpty()
    nickname?: string;

    @AutoMap()
    @IsOptional()
    //@IsEmail()
    @IsNotEmpty()
    email?: string;

    @AutoMap()
    @IsOptional()
    @MinLength(8)
    password?: string;
}
