import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ExperienceLevelable } from '../../../common/helpers/rewards';
import { Resource } from '../../../common/resource-base/resource.entity-base';
import { User } from '../../users/entities/user.entity';

@Entity('skills')
@Unique(['userId', 'name'])
export class Skill extends Resource implements ExperienceLevelable {
    @AutoMap()
    @Column()
    userId: string;

    @AutoMap(() => User)
    @ManyToOne(() => User, (user) => user.skills, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column({ default: 1 })
    level: number;

    @AutoMap()
    @Column({ default: 0 })
    levelExp: number;
}
