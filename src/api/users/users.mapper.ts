import { Mapper, createMap, forMember, mapFrom, undefinedSubstitution } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Paginated } from 'nestjs-paginate';
import { AuthConfigService } from '../../common/processed-config/auth-config.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper, private readonly authConfig: AuthConfigService) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, User, ReadUserDto);
            createMap(mapper, Paginated<User>, ReadManyUsersDto);
            createMap(
                mapper,
                CreateUserDto,
                User,
                forMember(
                    (user) => user.passwordHash,
                    mapFrom((createUserDto) => bcrypt.hashSync(createUserDto.password, this.authConfig.saltRounds)),
                ),
            );
            createMap(
                mapper,
                UpdateUserDto,
                User,
                forMember(
                    (user) => user.passwordHash,
                    mapFrom((createUserDto) => bcrypt.hashSync(createUserDto.password, this.authConfig.saltRounds)),
                    undefinedSubstitution(undefined),
                ),
            );
        };
    }
}
