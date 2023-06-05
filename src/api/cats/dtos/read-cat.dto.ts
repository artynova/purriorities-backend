import { AutoMap } from '@automapper/classes';
import { Rarity } from '../../../common/types/enums';

export class ReadCatDto {
    @AutoMap()
    nameId: string;

    @AutoMap()
    name: string;

    @AutoMap()
    description: string;

    @AutoMap()
    rarity: Rarity;
}
