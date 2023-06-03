import {PickType} from "@nestjs/swagger";
import {Skill} from "../skill.entity";
import {IsUUID} from "class-validator";

export class CreateSkillDto extends PickType(Skill, [
    'name'
]) {
    @IsUUID()
    userId: string;
}