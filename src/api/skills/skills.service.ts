import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {Skill} from "./skill.entity";
import {CreateSkillDto} from "./dtos/create-skill.dto";
import {ReadSkillDto} from "./dtos/read-skill.dto";
import {ReadManySkillsDto} from "./dtos/read-many-skills.dto";
import {UpdateSkillDto} from "./dtos/update-skill.dto";

@Injectable()
export class SkillsService extends ResourceService<Skill, CreateSkillDto, ReadSkillDto, ReadManySkillsDto, UpdateSkillDto> {
    constructor(@InjectRepository(Skill) repository: Repository<Skill>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                select: ['id', 'name', 'level', 'levelExp'],
            },
            mapper,
            Skill,
            CreateSkillDto,
            ReadSkillDto,
            ReadManySkillsDto,
            UpdateSkillDto,
        );
    }
}
