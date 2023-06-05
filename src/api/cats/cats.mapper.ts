import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { ReadCatDto } from './dtos/read-cat.dto';
import { ReadManyCatsDto } from './dtos/read-many-cats.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Cat, ReadCatDto);
            createMap(mapper, Paginated<Cat>, ReadManyCatsDto);
        };
    }
}
