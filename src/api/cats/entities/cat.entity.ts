import { AutoMap } from '@automapper/classes';
import { Rarity } from 'src/common/types/enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cats')
export class Cat {
    @AutoMap()
    @PrimaryColumn({ length: 16 })
    nameId: string; // unique string name, e.g. "stray_cat"

    @AutoMap()
    @Column({ length: 16 })
    name: string;

    @AutoMap()
    @Column({ length: 100 })
    description: string;

    @AutoMap()
    @Column({ type: 'enum', enum: Rarity })
    rarity: Rarity;
}
