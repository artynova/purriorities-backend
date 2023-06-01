import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

// TODO put categories, skills and cat ownerships arrays as dto arrays when those dtos are implemented
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
    levelCap: number; // in the entity class it is a getter, so it needs to be an explicit property here
}
