import { AutoMap } from '@automapper/classes';

export class ReadCatOwnershipDto {
    @AutoMap()
    catNameId: string;

    @AutoMap()
    level: number;

    xpBoost: number;

    price?: number;
}
