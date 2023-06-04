import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends OmitType(PartialType(CreateCategoryDto), ['questIds']) {}
