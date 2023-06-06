import {IsNotEmpty} from "class-validator";
import {AutoMap} from "@automapper/classes";
import {ApiHideProperty} from "@nestjs/swagger";

// export class CreateSkillDto extends PickType(Skill, [
//     'name'
// ]) {
//     @IsUUID()
//     userId: string;
// }

export class CreateSkillDto {
    @AutoMap()
    @ApiHideProperty()
    userId: string;

    @AutoMap()
    @IsNotEmpty()
    name: string;
}