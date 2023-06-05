import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Paginated } from 'nestjs-paginate';
import { getLevelCap } from '../../common/helpers/progression';
import { AuthConfigService } from '../../common/processed-config/auth-config.service';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReadCatOwnershipDto } from './dtos/read-cat-ownership.dto';
import { ReadManyUsersDto } from './dtos/read-many-users';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CatOwnership } from './entities/cat-ownership.entity';
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

            createMap(
                mapper,
                CatOwnership,
                ReadCatOwnershipDto,
                forMember(
                    (readCatOwnershipDto) => readCatOwnershipDto.xpBoost,
                    mapFrom((catOwnership) =>
                        this.logicConfig.catExpBoostFormula(catOwnership.cat.rarity)(catOwnership.level),
                    ), // TODO always join the cat into the ownership
                ),
            );
        };
    }
}
