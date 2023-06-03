import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserReadManyDto } from './dtos/user-read-many.dto';
import { UserReadOneDto } from './dtos/user-read-one.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                User,
                UserReadOneDto,
                forMember(
                    (userReadOneDto) => userReadOneDto.email,
                    mapFrom((user) => user.email),
                ),
            );
            createMap(mapper, Paginated<User>, UserReadManyDto);
            createMap(mapper, UserCreateDto, User);
            createMap(mapper, UserUpdateDto, User);
        };
    }
}
