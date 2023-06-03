import {IntersectionType, OmitType, PartialType, PickType} from "@nestjs/swagger";
import {CreateQuestDto} from "./create-quest.dto";
import {Quest} from "../quest.entity";
import {Type} from "class-transformer";
import {IsArray, ValidateNested} from "class-validator";

export class UpdateQuestDto extends IntersectionType(
    OmitType(PartialType(CreateQuestDto), ['stages']),
    PickType(Quest, ['finishDate'])
) {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateQuestDto)
    stages: UpdateQuestDto[];
}