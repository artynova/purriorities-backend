import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, User, ReadUserDto);
            createMap(mapper, Paginated<User>, ReadManyUsersDto);
            createMap(mapper, CreateUserDto, User);
            createMap(mapper, UpdateUserDto, User);
        };
    }
}
