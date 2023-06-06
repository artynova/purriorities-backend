import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createPaginatedToReadManyMap } from '../../common/helpers/mapping';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ReadCategoryDto } from './dtos/read-category.dto';
import { ReadManyCategoriesDto } from './dtos/read-many-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Category, ReadCategoryDto);
            createPaginatedToReadManyMap(mapper, Category, ReadCategoryDto, ReadManyCategoriesDto);
            createMap(mapper, CreateCategoryDto, Category);
            createMap(mapper, UpdateCategoryDto, Category);
        };
    }
}
