import {OmitType, PartialType} from "@nestjs/swagger";
import {Skill} from "../skill.entity";

export class UpdateSkillDto extends OmitType(PartialType(Skill), [
    'id',
    'user'
]) {}