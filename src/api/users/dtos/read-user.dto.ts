// // TODO put categories, skills and cat ownerships arrays as dtos arrays when those dtos are implemented
// export class ReadUserDto extends OmitType(User, [
//     'passwordHash',
//     'lastPunishmentCheckDate',
//     'categories',
//     'skills',
//     'catOwnerships',
// ]) {
//     /**
//      * Amount of exp needed to progress to next level.
//      * @example 200
//      */
//     @IsInt()
//     @Min(0)
//     levelCap: number;
// }

import {AutoMap} from '@automapper/classes';
import {ReadCatOwnershipDto} from "../../cats/dtos/read-cat-ownership.dto";

export class ReadUserDto {
    @AutoMap()
    nickname: string;

    @AutoMap()
    email: string;

    @AutoMap()
    locale: string;

    @AutoMap()
    timezone: string;

    @AutoMap()
    level: number;

    @AutoMap()
    levelExp: number;

    /**
     * Amount of exp needed to progress to next level.
     * @example 200
     */
    levelCap: number;

    @AutoMap()
    trust: number;

    @AutoMap()
    feed: number;

    @AutoMap()
    catnip: number;

    @AutoMap(() => [ReadCatOwnershipDto])
    catOwnerships: ReadCatOwnershipDto[];
}
