import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { ExperienceLevelable } from '../../../common/helpers/rewards';
import { Resource } from '../../../common/resource-base/resource.entity-base';
import { Category } from '../../categories/entities/category.entity';
import { CatOwnership } from '../../cats/entities/cat-ownership.entity';
import { Skill } from '../../skills/entities/skill.entity';

@Entity('users')
export class User extends Resource implements ExperienceLevelable {
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
    @Column({ default: 1 })
    level: number;

    /**
     * Exp gained towards next level.
     * @example 150
     */
    @AutoMap()
    @Column({ type: 'double precision', default: 0 })
    levelExp: number;

    @AutoMap(() => [Category])
    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

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
    @Column({ type: 'double precision', default: 100 })
    trust: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    lastPunishmentCheckDate: Date;

    @Column({ default: () => "NOW() - INTERVAL '1 DAY'" }) // last runaway on the "previous day" before registration, thus allowing the system to punish the user normally starting from the first actual day
    lastRunawayDate: Date;

    @AutoMap(() => [CatOwnership])
    @OneToMany(() => CatOwnership, (catOwnership) => catOwnership.user)
    catOwnerships: CatOwnership[];
}
