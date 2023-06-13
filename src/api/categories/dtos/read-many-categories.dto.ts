import { ReadManyDtoBase } from '../../../common/resource-base/read-many.dto-base';
import { ReadCategoryDto } from './read-category.dto';

export class ReadManyCategoriesDto extends ReadManyDtoBase<ReadCategoryDto> {
    data: ReadCategoryDto[];
}
