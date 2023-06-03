import { IsEmail, IsInt, IsLocale, IsNotEmpty, IsPositive, IsTimeZone, Max, Min } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Skill } from '../../skills/skill.entity';
import { CatOwnership } from './cat-ownership.entity';
import { Resource } from '../../../common/resource-base/resource.entity-base';

@Entity('users')
export class User extends Resource {
    /**
     * @example StepanBandera19
     */
    //@IsAlphanumeric(null, { message: 'Nickname should consist of latin letters and/or numbers' })
    @IsNotEmpty({ message: 'Nickname is missing' })
    @Column({ unique: true })
    nickname: string;

    @AutoMap()
    @IsEmail({}, { message: 'Email is invalid' })
    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @AutoMap()
    @CreateDateColumn()
    joinDate: Date;

    @AutoMap()
    @IsLocale({ message: 'Locale is invalid' })
    @Column()
    locale: string;

    @AutoMap()
    @IsTimeZone({ message: 'Timezone is invalid' })
    @Column()
    timezone: string;

    @IsInt()
    @IsPositive()
    @Column({ default: 1 })
    level: number;

    /**
     * Exp gained towards next level.
     * @example 150
     */
    @IsInt()
    @Min(0)
    @Column({ default: 0 })
    levelExp: number;

    /**
     * Amount of exp needed to progress to next level.
     */
    get levelCap() {
        return this.level + this.levelExp;
    }

    @AutoMap(() => [Skill])
    @OneToMany(() => Skill, (skill) => skill.user)
    skills: Skill[];

    @IsInt()
    @Min(0)
    @Column({ default: 0 })
    feed: number;

    @IsInt()
    @Min(0)
    @Column({ default: 0 })
    catnip: number;

    @IsInt()
    @Min(0)
    @Max(100)
    @Column({ default: 0 })
    trust: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    lastPunishmentSyncDate: Date;

    @AutoMap(() => [Category])
    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @AutoMap(() => CatOwnership)
    @OneToMany(() => CatOwnership, (catOwnership) => catOwnership.user)
    catOwnerships: CatOwnership[];
}
