import {ReadStageDto} from "../../stages/dtos/read-stage.dto";
import {ReadCategoryDto} from "../../categories/dtos/read-category.dto";
import {ReadSkillDto} from "../../skills/dtos/read-skill.dto";
import {Priority} from "../../../common/types/enums";
import {AutoMap} from "@automapper/classes";

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
    name: string;

    @AutoMap()
    priority: Priority;

    @AutoMap()
    deadlineSetDate: Date;

    @AutoMap()
    deadline: Date;

    @AutoMap()
    limit: Date;

    @AutoMap()
    category: ReadCategoryDto;

    @AutoMap()
    questSkills: ReadSkillDto[];

    @AutoMap()
    stages: ReadStageDto[];

    @AutoMap()
    isFinished: boolean;
}