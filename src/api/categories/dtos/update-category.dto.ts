import {AutoMap} from "@automapper/classes";
import {IsNotEmpty, IsUUID} from "class-validator";

// export class UpdateCategoryDto extends OmitType(PartialType(CreateCategoryDto), ['questIds']) {}

export class UpdateCategoryDto {
    @AutoMap()
    @IsUUID()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    name: string;
}