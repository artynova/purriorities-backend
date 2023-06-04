import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@ApiExtraModels(CreateUserDto) // TODO remove this when CreateUserDto is used properly in auth and displayed automatically, this is a crutch to forcibly display CreateUserDto in the api until then
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    /**
     * Returns the current user.
     */
    @Get('me')
    async findOne(): Promise<ReadUserDto> {
        console.log('read');
        return this.service.readOne(''); // placeholder id
    }

    /**
     * Updates the supplied fields for current user.
     */
    @Patch('me')
    async update(@Body() updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
        console.log('update');
        return this.service.update('', updateUserDto); // placeholder id
    }

    /**
     * Deletes the current user.
     */
    @Delete('me')
    async remove(): Promise<ReadUserDto> {
        console.log('delete');
        return this.service.delete(''); // placeholder id
    }
}
