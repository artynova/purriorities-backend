import {ReadStageDto} from "../../stages/dtos/read-stage.dto";
import {ReadCategoryDto} from "../../categories/dtos/read-category.dto";
import {ReadSkillDto} from "../../skills/dtos/read-skill.dto";
import {Priority} from "../../../common/types/enums";
import {AutoMap} from "@automapper/classes";
import {ReadShortSkillDto} from "../../skills/dtos/read-short-skill.dto";

// export class ReadQuestDto extends OmitType(Quest, [
//     'category',
//     'questSkills',
//     'stages',
//     'finishDate',
// ]) {
//     @Type(() => ReadCategoryDto)
//     category: ReadCategoryDto;
//
//     @IsArray()
//     @ValidateNested({each: true})
//     @Type(() => ReadSkillDto)
//     questSkills: ReadSkillDto[];
//
//     @IsArray()
//     @ValidateNested({each: true})
//     @Type(() => ReadStageDto)
//     stages: ReadStageDto[];
// }

export class ReadQuestDto {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    priority: Priority;

    @AutoMap()
    deadline?: string;

    @AutoMap()
    limit?: string;

    @AutoMap()
    interval?: number;

    @AutoMap(() => ReadCategoryDto)
    category: ReadCategoryDto;

    @AutoMap(() => [ReadShortSkillDto])
    skills: ReadShortSkillDto[];

    @AutoMap(() => [ReadStageDto])
    stages: ReadStageDto[];

    @AutoMap()
    isFinished: boolean;
}