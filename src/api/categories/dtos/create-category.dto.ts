import {PickType} from "@nestjs/swagger";
import {Category} from "../category.entity";
import {IsArray, IsUUID} from "class-validator";

export class CreateCategoryDto extends PickType(Category, [
    'name',
]) {
    @IsUUID()
    userId: string;

    @IsArray()
    @IsUUID(undefined, {each: true})
    questIds: string[]
}