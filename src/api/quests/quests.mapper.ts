import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Paginated} from "nestjs-paginate";
import {Quest} from "./quest.entity";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";

@Injectable()
export class QuestsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Quest, ReadQuestDto);
            createMap(mapper, Paginated<Quest>, ReadManyQuestsDto);
            createMap(mapper, CreateQuestDto, Quest);
            createMap(mapper, UpdateQuestDto, Quest);
        };
    }
}