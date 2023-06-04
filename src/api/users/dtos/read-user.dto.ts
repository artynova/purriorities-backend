import { OmitType } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { User } from '../entities/user.entity';

// TODO put categories, skills and cat ownerships arrays as dtos arrays when those dtos are implemented
export class ReadUserDto extends OmitType(User, [
    'passwordHash',
    'lastPunishmentCheckDate',
    'categories',
    'skills',
    'catOwnerships',
]) {
    /**
     * Amount of exp needed to progress to next level.
     * @example 200
     */
    @IsInt()
    @Min(0)
    levelCap: number;
}
