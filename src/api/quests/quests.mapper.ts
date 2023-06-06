import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Quest} from "./entities/quest.entity";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {createPaginatedToReadManyMap} from "../../common/helpers/mapping";

@Injectable()
export class QuestsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Quest, ReadQuestDto);
            createPaginatedToReadManyMap(mapper, Quest, ReadQuestDto, ReadManyQuestsDto);
            createMap(mapper, CreateQuestDto, Quest);
            createMap(mapper, UpdateQuestDto, Quest);
        };
    }
}