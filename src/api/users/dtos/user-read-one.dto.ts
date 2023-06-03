import { MapperOmitType } from '@automapper/classes/mapped-types';
import { User } from '../entities/user.entity';
import { AutoMap } from '@automapper/classes';

// TODO put categories, skills and cat ownerships arrays as dto arrays when those dtos are implemented
export class UserReadOneDto extends MapperOmitType(User, [
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
    @AutoMap()
    levelCap: number; // in the entity class it is a getter, so it needs to be an explicit property here
}
