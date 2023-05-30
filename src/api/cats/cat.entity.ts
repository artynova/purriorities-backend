import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Rarity } from '../../common/enums/rarity.enum';

@Entity('cats')
export class Cat {
    @PrimaryColumn({ length: 16 })
    nameId: string; // unique string name, e.g. "stray_cat"

    @Column({ type: 'enum', enum: Rarity })
    rarity: Rarity;
}
