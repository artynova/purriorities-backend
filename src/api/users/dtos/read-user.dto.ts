import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {IsInt, Min} from "class-validator";

// TODO put categories, skills and cat ownerships arrays as dtos arrays when those dtos are implemented
export class ReadUserDto extends OmitType(User, [
    'passwordHash',
    'lastPunishmentSyncDate',
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
    levelCap: number; // in the entity class it is a getter, so it needs to be an explicit property here
}
