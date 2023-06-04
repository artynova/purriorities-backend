import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOptionsWhere, Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, FilterSuffix, paginate, PaginateConfig, Paginated, PaginateQuery} from "nestjs-paginate";
import {Cat} from "./cat.entity";
import {ReadCatDto} from "./dtos/read-cat.dto";
import {ReadManyCatsDto} from "./dtos/read-many-cats.dto";

const catsPaginationConfig: PaginateConfig<Cat> = {
    sortableColumns: [],
    defaultSortBy: [['nameId', 'DESC']],
    searchableColumns: [],
    select: [],
    filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        age: true,
    },
}

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat) protected repository: Repository<Cat>,
        @InjectMapper() protected mapper: Mapper
    ) {}

    async readAll(query: PaginateQuery): Promise<ReadManyCatsDto> {
        return this.mapper.map(
            await paginate(query, this.repository, catsPaginationConfig),
            Paginated<Cat>,
            ReadManyCatsDto,
        );
    }

    async readOne(id: string): Promise<ReadCatDto> {
        return this.mapper.map(await this.findOneOrFail(id), Cat, ReadCatDto);
    }

    protected async findOneOrFail(id: string): Promise<Cat> {
        const out = await this.repository.findOne({
            where: { id } as FindOptionsWhere<Cat>,
            relations: catsPaginationConfig.relations,
        }); // as FindOptionsWhere<Entity>); // a little help for typescript to figure out that, since id is present in Resource, id is also present in Entity
        if (out === null) throw new NotFoundException('Required resource was not found in the database');
        return out;
    }
}
