import {AutoMap} from "@automapper/classes";

// export class ReadSkillDto extends OmitType(Skill, [
//     'user'
// ]) {
//     @IsUUID()
//     userId: string;
// }

export class ReadSkillDto {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    level: number;

    @AutoMap()
    levelExp: number;

    @AutoMap()
    levelCap: number;
}