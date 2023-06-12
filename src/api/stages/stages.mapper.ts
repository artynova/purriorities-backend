import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createPaginatedToReadManyMap } from '../../common/helpers/mapping';
import { CreateStageDto } from './dtos/create-stage.dto';
import { ReadManyStagesDto } from './dtos/read-many-stages.dto';
import { ReadStageDto } from './dtos/read-stage.dto';
import { UpdateStageDto } from './dtos/update-stage.dto';
import { Stage } from './entities/stage.entity';

@Injectable()
export class StagesMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                Stage,
                ReadStageDto,
                forMember(
                    (readStageDto) => readStageDto.finished,
                    mapFrom((stage) => stage.finishDate !== null),
                ),
            );
            createPaginatedToReadManyMap(mapper, Stage, ReadStageDto, ReadManyStagesDto);
            createMap(mapper, CreateStageDto, Stage);
            createMap(mapper, UpdateStageDto, Stage);
        };
    }
}
