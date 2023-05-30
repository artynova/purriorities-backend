import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cats')
export class Cat {
    @PrimaryColumn({ length: 16 })
    nameId: string; // unique string name, e.g. "stray_cat"

    @Column({ type: 'tinyint' })
    rarity: number;
}
