import {IsNotEmpty} from 'class-validator';
import {AutoMap} from "@automapper/classes";

// export class CreateCategoryDto extends PickType(Category, ['name']) {
//     @IsArray()
//     questIds: string[];
// }

export class CreateCategoryDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;
}
