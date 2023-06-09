import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, mapFrom, Mapper, typeConverter} from "@automapper/core";
import {Quest} from "./entities/quest.entity";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {createPaginatedToReadManyMap} from "../../common/helpers/mapping";
import {QuestSkill} from "./entities/quest-skill.entity";
import {ReadSkillDto} from "../skills/dtos/read-skill.dto";
import {ReadShortSkillDto} from "../skills/dtos/read-short-skill.dto";

const stringToDateConverter = typeConverter(String, Date, (str) => str ? new Date(str) : null);
//const dateToStringConvertor = typeConverter(Date, String, (date) => date?.toISOString());

@Injectable()
export class QuestsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                Quest,
                ReadQuestDto,
                forMember((readQuestDto) => readQuestDto.skills,
                    mapFrom(quest => quest.questSkills.map(qs => {
                                return {
                                    id: qs.skill.id,
                                    name: qs.skill.name
                                }
                            }
                        )
                    )
                ),
            );
            //createMap(mapper, Quest, ReadQuestDto, dateToStringConvertor);
            createPaginatedToReadManyMap(mapper, Quest, ReadQuestDto, ReadManyQuestsDto);
            createMap(mapper, CreateQuestDto, Quest, stringToDateConverter);
            createMap(mapper, UpdateQuestDto, Quest, stringToDateConverter);
            createMap(mapper, QuestSkill, ReadSkillDto);
        };
    }
}