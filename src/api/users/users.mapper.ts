import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Paginated } from 'nestjs-paginate';
import { getLevelCap } from '../../common/helpers/formulas';
import { AuthConfigService } from '../../common/processed-config/auth-config.service';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { SyncUserDto } from './dtos/sync-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersMapper extends AutomapperProfile {
    constructor(
        @InjectMapper() mapper: Mapper,
        private readonly authConfig: AuthConfigService,
        private readonly logicConfig: LogicConfigService,
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                User,
                ReadUserDto,
                forMember(
                    (readUserDto) => readUserDto.levelCap,
                    mapFrom((user) => getLevelCap(user.level, this.logicConfig.mainExpFormula)),
                ),
            );

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
                    mapFrom((createUserDto) =>
                        createUserDto.password
                            ? bcrypt.hashSync(createUserDto.password, this.authConfig.saltRounds)
                            : undefined,
                    ),
                ),
            );

            createMap(mapper, User, SyncUserDto);
            createMap(mapper, User, ReadUserDto);
        };
    }
}
