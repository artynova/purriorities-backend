import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator} from "nestjs-paginate";
import {Quest} from "./quest.entity";
import {CreateQuestDto} from "./dtos/create-quest.dto";
import {ReadQuestDto} from "./dtos/read-quest.dto";
import {ReadManyQuestsDto} from "./dtos/read-many-quests.dto";
import {UpdateQuestDto} from "./dtos/update-quest.dto";

@Injectable()
export class QuestsService extends ResourceService<Quest, CreateQuestDto, ReadQuestDto, ReadManyQuestsDto, UpdateQuestDto> {
    constructor(@InjectRepository(Quest) repository: Repository<Quest>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
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
}
