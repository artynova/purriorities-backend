import { PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Category } from '../category.entity';

export class CreateCategoryDto extends PickType(Category, ['name']) {
    @IsArray()
    questIds: string[];
}
