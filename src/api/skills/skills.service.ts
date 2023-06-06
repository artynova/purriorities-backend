import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, paginate, PaginateConfig, Paginated, PaginateQuery} from "nestjs-paginate";
import {Skill} from "./skill.entity";
import {CreateSkillDto} from "./dtos/create-skill.dto";
import {ReadSkillDto} from "./dtos/read-skill.dto";
import {ReadManySkillsDto} from "./dtos/read-many-skills.dto";
import {UpdateSkillDto} from "./dtos/update-skill.dto";
import {ReadManyQuestsDto} from "../quests/dtos/read-many-quests.dto";
import {Quest} from "../quests/entities/quest.entity";

@Injectable()
export class SkillsService extends ResourceService<Skill, CreateSkillDto, ReadSkillDto, ReadManySkillsDto, UpdateSkillDto> {
    constructor(@InjectRepository(Skill) repository: Repository<Skill>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: ['id'],
                defaultSortBy: [['id', 'DESC']],
                select: ['id', 'name', 'level', 'levelExp'],
                filterableColumns: {
                    userId: [FilterOperator.EQ]
                },
            },
            mapper,
            Skill,
            CreateSkillDto,
            ReadSkillDto,
            ReadManySkillsDto,
            UpdateSkillDto,
        );
    }

    async readAllForUser(userId: string, query: PaginateQuery): Promise<ReadManySkillsDto> {
        const queryOptions: FindManyOptions = {
            //relationLoadStrategy:
            where: {
                userId,
            },
        };

        return this.mapper.map(
            await paginate(query, this.repository, {...this.paginateConfig, ...queryOptions} as PaginateConfig<Skill>),
            Paginated<Skill>,
            ReadManySkillsDto,
        );
    }
}
