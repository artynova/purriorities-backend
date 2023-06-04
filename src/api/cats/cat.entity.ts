import { Rarity } from 'src/common/types/enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cats')
export class Cat {
    @PrimaryColumn({ length: 16 })
    nameId: string; // unique string name, e.g. "stray_cat"

    @Column({length: 16})
    name: string;

    @Column({length: 100})
    description: string;

    @Column({ type: 'enum', enum: Rarity })
    rarity: Rarity;
}
