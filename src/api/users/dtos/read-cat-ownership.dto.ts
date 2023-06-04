import {AutoMap} from "@automapper/classes";

export class ReadCatOwnershipDto {
    @AutoMap()
    catNameId: string;

    @AutoMap()
    level: number;

    @AutoMap()
    xpBoost: number;

    @AutoMap()
    price?: number;
}