import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Paginated} from "nestjs-paginate";
import {Stage} from "./stage.entity";
import {ReadStageDto} from "./dtos/read-stage.dto";
import {CreateStageDto} from "./dtos/create-stage.dto";
import {UpdateStageDto} from "./dtos/update-stage.dto";
import {ReadManyStagesDto} from "./dtos/read-many-stages.dto";

@Injectable()
export class StagesMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Stage, ReadStageDto);
            createMap(mapper, Paginated<Stage>, ReadManyStagesDto);
            createMap(mapper, CreateStageDto, Stage);
            createMap(mapper, UpdateStageDto, Stage);
        };
    }
}