import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsOptional } from 'class-validator';

// export class UpdateCategoryDto extends OmitType(PartialType(CreateCategoryDto), ['questIds']) {}

export class UpdateCategoryDto {
    @AutoMap()
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
