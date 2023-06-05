import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { Resource } from '../../../common/resource-base/resource.entity-base';
import { Category } from '../../categories/category.entity';
import { Skill } from '../../skills/skill.entity';
import { CatOwnership } from './cat-ownership.entity';

@Entity('users')
export class User extends Resource {
    /**
     * @example StepanBandera19
     */
    @AutoMap()
    @Column({ unique: true })
    nickname: string;

    @AutoMap()
    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @AutoMap()
    @CreateDateColumn()
    joinDate: Date;

    @AutoMap()
    @Column()
    locale: string;

    @AutoMap()
    @Column()
    timezone: string;

    @AutoMap()
    @Column({ default: 1 })
    level: number;

    /**
     * Exp gained towards next level.
     * @example 150
     */
    @AutoMap()
    @Column({ default: 0 })
    levelExp: number;

    @AutoMap(() => [Skill])
    @OneToMany(() => Skill, (skill) => skill.user)
    skills: Skill[];

    @AutoMap()
    @Column({ default: 0 })
    feed: number;

    @AutoMap()
    @Column({ default: 0 })
    catnip: number;

    @AutoMap()
    @Column({ default: 0 })
    trust: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    lastPunishmentCheckDate: Date;

    @AutoMap(() => [Category])
    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @AutoMap(() => [CatOwnership])
    @OneToMany(() => CatOwnership, (catOwnership) => catOwnership.user)
    catOwnerships: CatOwnership[];
}
