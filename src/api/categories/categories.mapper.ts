import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Paginated} from "nestjs-paginate";
import {Category} from "./category.entity";
import {ReadCategoryDto} from "./dtos/read-category.dto";
import {ReadManyCategoriesDto} from "./dtos/read-many-categories.dto";
import {UpdateCategoryDto} from "./dtos/update-category.dto";
import {CreateCategoryDto} from "./dtos/create-category.dto";
import {CreateCategoryFullDto} from "./dtos/create-category-full.dto";

@Injectable()
export class CategoriesMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Category, ReadCategoryDto);
            createMap(mapper, Paginated<Category>, ReadManyCategoriesDto);
            createMap(mapper, CreateCategoryDto, Category);
            createMap(mapper, UpdateCategoryDto, Category);
            createMap(mapper, CreateCategoryFullDto, Category);
        };
    }
}