import { AutoMap } from '@automapper/classes';
import { ReadShortSkillDto } from './read-short-skill.dto';

// export class ReadSkillDto extends OmitType(Skill, [
//     'user'
// ]) {
//     @IsUUID()
//     userId: string;
// }

export class ReadSkillDto extends ReadShortSkillDto {
    @AutoMap()
    level: number;

    @AutoMap()
    levelExp: number;

    @AutoMap()
    levelCap: number;
}
