import {AutoMap} from "@automapper/classes";
import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateCategoryFullDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsUUID()
    userId: string;
}