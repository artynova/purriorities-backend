import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserReadOneDto } from './dtos/user-read-one.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UsersService } from './users.service';

@ApiExtraModels(UserCreateDto) // TODO remove this when CreateUserDto is used properly in auth and displayed automatically, this is a crutch to forcibly display CreateUserDto in the api until then
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    /**
     * Returns the current user.
     */
    @Get('me')
    async findOne(): Promise<UserReadOneDto> {
        console.log('read');
        return this.service.readOne(''); // placeholder id
    }

    /**
     * Updates the supplied fields for current user.
     */
    @Patch('me')
    async update(@Body() updateUserDto: UserUpdateDto): Promise<UserReadOneDto> {
        console.log('update');
        return this.service.update('', updateUserDto); // placeholder id
    }

    /**
     * Deletes the current user.
     */
    @Delete('me')
    async remove(): Promise<UserReadOneDto> {
        console.log('delete');
        return this.service.delete(''); // placeholder id
    }
}
