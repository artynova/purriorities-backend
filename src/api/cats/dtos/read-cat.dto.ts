import {Rarity} from "../../../common/types/enums";
import {AutoMap} from "@automapper/classes";

export class ReadCatDto {
    @AutoMap()
    nameId: string;

    @AutoMap()
    rarity: Rarity;
}
