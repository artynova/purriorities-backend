// export class UpdateSkillDto extends OmitType(PartialType(Skill), [
//     'id',
//     'user'
// ]) {}

import {AutoMap} from "@automapper/classes";
import {IsNotEmpty, IsUUID} from "class-validator";

export class UpdateSkillDto {
    @AutoMap()
    @IsUUID()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    name: string;
}