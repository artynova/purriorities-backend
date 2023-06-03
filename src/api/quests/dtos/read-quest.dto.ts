import {OmitType} from "@nestjs/swagger";
import {Quest} from "../quest.entity";
import {ReadStageDto} from "../../stages/dtos/read-stage.dto";
import {ReadCategoryDto} from "../../categories/dtos/read-category.dto";
import {ReadSkillDto} from "../../skills/dtos/read-skill.dto";
import {IsArray, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class ReadQuestDto extends OmitType(Quest, [
    'category',
    'questSkills',
    'stages',
    'finishDate',
]) {
    @Type(() => ReadCategoryDto)
    category: ReadCategoryDto;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ReadSkillDto)
    questSkills: ReadSkillDto[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ReadStageDto)
    stages: ReadStageDto[];
}