import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import console from 'console';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@ApiExtraModels(CreateUserDto) // TODO remove this when CreateUserDto is used properly in auth and displayed automatically, this is a crutch to forcibly display CreateUserDto in the api until then
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Returns the current user.
     */
    @Get('me')
    findOne(): ReadUserDto {
        console.log('read');
        return new ReadUserDto(); // placeholder
    }

    /**
     * Updates the supplied fields for current user.
     */
    @Patch('me')
    update(@Body() updateUserDto: UpdateUserDto): ReadUserDto {
        console.log('update');
        return new ReadUserDto();
    }

    /**
     * Deletes the current user.
     */
    @Delete('me')
    remove(): void {
        console.log('delete');
    }
}
