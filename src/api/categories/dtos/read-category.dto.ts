import {OmitType} from "@nestjs/swagger";
import {Category} from "../category.entity";
import {IsArray, IsUUID, ValidateNested} from "class-validator";
import {ReadQuestDto} from "../../quests/dtos/read-quest.dto";
import {Type} from "class-transformer";

export class ReadCategoryDto extends OmitType(Category, [
    'user',
    'quests'
]) {
    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ReadQuestDto)
    quests: ReadQuestDto[];
}