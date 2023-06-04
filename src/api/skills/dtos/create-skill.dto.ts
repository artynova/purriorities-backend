import {IsNotEmpty, IsUUID} from "class-validator";
import {AutoMap} from "@automapper/classes";

// export class CreateSkillDto extends PickType(Skill, [
//     'name'
// ]) {
//     @IsUUID()
//     userId: string;
// }

export class CreateSkillDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;
}