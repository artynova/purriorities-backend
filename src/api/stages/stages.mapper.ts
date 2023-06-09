import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, mapFrom, Mapper} from "@automapper/core";
import {Stage} from "./stage.entity";
import {ReadStageDto} from "./dtos/read-stage.dto";
import {CreateStageDto} from "./dtos/create-stage.dto";
import {UpdateStageDto} from "./dtos/update-stage.dto";
import {ReadManyStagesDto} from "./dtos/read-many-stages.dto";
import {createPaginatedToReadManyMap} from "../../common/helpers/mapping";

@Injectable()
export class StagesMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Stage, ReadStageDto);
            createPaginatedToReadManyMap(mapper, Stage, ReadStageDto, ReadManyStagesDto);
            createMap(mapper, CreateStageDto, Stage);
            createMap(mapper, UpdateStageDto, Stage);
        };
    }
}