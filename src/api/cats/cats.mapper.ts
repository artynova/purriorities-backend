import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createPaginatedToReadManyMap } from '../../common/helpers/mapping';
import { LogicConfigService } from '../../common/processed-config/logic-config.service';
import { ReadCatOwnershipDto } from './dtos/read-cat-ownership.dto';
import { ReadCatDto } from './dtos/read-cat.dto';
import { ReadManyCatsDto } from './dtos/read-many-cats.dto';
import { CatOwnership } from './entities/cat-ownership.entity';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper, private readonly logicConfig: LogicConfigService) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Cat, ReadCatDto);

            createPaginatedToReadManyMap(mapper, Cat, ReadCatDto, ReadManyCatsDto);

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
                forMember(
                    (readCatOwnershipDto) => readCatOwnershipDto.price,
                    mapFrom((catOwnership) =>
                        catOwnership.isAway
                            ? this.logicConfig.catReturnPriceFormula(catOwnership.cat.rarity)(catOwnership.level)
                            : undefined,
                    ), // TODO always join the cat into the ownership
                ),
            );
        };
    }
}
