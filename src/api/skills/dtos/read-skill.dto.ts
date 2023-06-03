import {OmitType} from "@nestjs/swagger";
import {Skill} from "../skill.entity";
import {IsUUID} from "class-validator";

export class ReadSkillDto extends OmitType(Skill, [
    'user'
]) {
    @IsUUID()
    userId: string;
}