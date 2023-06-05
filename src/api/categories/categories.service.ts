import {Injectable} from "@nestjs/common";
import {ResourceService} from "../../common/resource-base/resource.service-base";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {FilterOperator, FilterSuffix} from "nestjs-paginate";
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dtos/create-category.dto";
import {ReadCategoryDto} from "./dtos/read-category.dto";
import {ReadManyCategoriesDto} from "./dtos/read-many-categories.dto";
import {UpdateCategoryDto} from "./dtos/update-category.dto";

@Injectable()
export class CategoriesService extends ResourceService<Category, CreateCategoryDto, ReadCategoryDto, ReadManyCategoriesDto, UpdateCategoryDto> {
    constructor(@InjectRepository(Category) repository: Repository<Category>, @InjectMapper() mapper: Mapper) {
        super(
            repository,
            {
                sortableColumns: [],
                defaultSortBy: [['name', 'ASC']],
                select: ['id', 'name', 'inbox', 'quests'],
            },
            mapper,
            Category,
            CreateCategoryDto,
            ReadCategoryDto,
            ReadManyCategoriesDto,
            UpdateCategoryDto,
        );
    }
}