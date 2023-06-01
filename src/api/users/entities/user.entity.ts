import { IsEmail, IsLocale, IsNotEmpty, IsTimeZone } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Skill } from '../../skills/skill.entity';
import { CatOwnership } from './cat-ownership.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * @example StepanBandera19
     */
    @IsNotEmpty({ message: 'Nickname is missing' })
    @Column({ unique: true })
    nickname: string;

    @IsEmail({}, { message: 'Email is invalid' })
    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @CreateDateColumn()
    joinDate: Date;

    @IsLocale({ message: 'Locale is invalid' })
    @Column()
    locale: string;

    @IsTimeZone({ message: 'Timezone is invalid' })
    @Column()
    timezone: string;

    @Column({ default: 1 })
    level: number;

    /**
     * Exp gained towards next level.
     * @example 150
     */
    @Column({ default: 0 })
    levelExp: number;

    get levelCap() {
        return this.level + this.levelExp;
    }

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
