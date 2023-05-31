import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Skill } from '../skills/skill.entity';
import { CatOwnership } from './cat-ownership.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nickname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @CreateDateColumn()
    joinDate: Date;

    @Column()
    locale: string;

    @Column()
    timezone: string;

    @Column({ default: 1 })
    level: number;

    @Column({ default: 0 })
    levelExp: number; // 0 = start of current level

    @OneToMany(() => Skill, (skill) => skill.user)
    skills: Skill[];

    @Column({ default: 0 })
    feed: number;

    @Column({ default: 0 })
    catnip: number;

    @Column({ default: 0 })
    trust: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    lastPunishmentSyncDate: Date;

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => CatOwnership, (catOwnership) => catOwnership.user)
    catOwnerships: CatOwnership[];
}
