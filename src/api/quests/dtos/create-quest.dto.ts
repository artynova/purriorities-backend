import {PickType} from "@nestjs/swagger";
import {Quest} from "../quest.entity";
import {IsArray, IsUUID, ValidateNested} from "class-validator";
import {CreateStageDto} from "../../stages/dtos/create-stage.dto";
import {Type} from "class-transformer";

export class CreateQuestDto extends PickType(Quest, [
    'name',
    'priority',
    'deadline',
    'deadlineSetDate',
    'limit',
]) {
    @IsUUID()
    categoryId: string;

    @IsUUID(undefined, {each: true})
    skillIds: string[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateStageDto)
    stages: CreateStageDto[]
}