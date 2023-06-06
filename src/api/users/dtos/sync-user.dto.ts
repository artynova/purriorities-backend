import {AutoMap} from '@automapper/classes';
import {ReadCategoryDto} from '../../categories/dtos/read-category.dto';
import {ReadSkillDto} from '../../skills/dtos/read-skill.dto';
import {ReadUserDto} from './read-user.dto';

export class SyncUserDto extends ReadUserDto {
    @AutoMap(() => [ReadSkillDto])
    skills: ReadSkillDto[];

    @AutoMap(() => [ReadCategoryDto])
    categories: ReadCategoryDto[];
}
