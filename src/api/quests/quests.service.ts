import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, paginate, Paginated, PaginateQuery} from "nestjs-paginate";
import {Quest} from "./entities/quest.entity";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";
import {QuestSkill} from "./entities/quest-skill.entity";

@Injectable()
export class QuestsService extends ResourceService<Quest, CreateQuestDto, ReadQuestDto, ReadManyQuestsDto, UpdateQuestDto> {
    constructor(
        @InjectRepository(Quest) questRepository: Repository<Quest>,
        //@InjectRepository(QuestSkill) private questSkillRepository: Repository<QuestSkill>,
        @InjectMapper() mapper: Mapper
    ) {
        super(
            questRepository,
            {
                sortableColumns: ['deadline'],
                defaultSortBy: [['deadline', 'ASC']],
                select: ['id', 'name', 'priority', 'deadline', 'limit', 'interval', 'category', 'questSkills', 'stages', 'finishDate'],
                filterableColumns: {
                    "category.(user.(id))": [FilterOperator.EQ],
                    categoryId: [FilterOperator.EQ],
                    finishDate: [FilterOperator.NULL],
                    "questSkills.(id)": [FilterOperator.EQ]
                },
            },
            mapper,
            Quest,
            CreateQuestDto,
            ReadQuestDto,
            ReadManyQuestsDto,
            UpdateQuestDto,
        );
    }

    async readAll(query: PaginateQuery): Promise<ReadManyQuestsDto> {
        const paginated = await paginate(query, this.repository, this.paginateConfig);

        //paginated.data['questSkills'] = await this.questSkillRepository.findBy({questId: });

        return this.mapper.mapAsync(
            await paginate(query, this.repository, this.paginateConfig),
            Paginated<Quest>,
            this.readManyDtoType,
        );
    }
}
