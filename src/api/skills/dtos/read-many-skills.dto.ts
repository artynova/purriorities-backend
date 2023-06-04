import {ReadManyDtoBase} from "../../../common/resource-base/read-many.dto-base";
import {ReadSkillDto} from "./read-skill.dto";

export class ReadManySkillsDto extends ReadManyDtoBase<ReadSkillDto> {
    data: ReadSkillDto[];
}