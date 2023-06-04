import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Paginated} from "nestjs-paginate";
import {Skill} from "./skill.entity";
import {ReadSkillDto} from "./dtos/read-skill.dto";
import {ReadManySkillsDto} from "./dtos/read-many-skills.dto";
import {CreateSkillDto} from "./dtos/create-skill.dto";
import {UpdateSkillDto} from "./dtos/update-skill.dto";

@Injectable()
export class SkillsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Skill, ReadSkillDto);
            createMap(mapper, Paginated<Skill>, ReadManySkillsDto);
            createMap(mapper, CreateSkillDto, Skill);
            createMap(mapper, UpdateSkillDto, Skill);
        };
    }
}