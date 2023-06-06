import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { User } from '../users/entities/user.entity';
import {AutoMap} from "@automapper/classes";

@Entity('skills')
export class Skill extends Resource {
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
    @Column({ default: 0 })
    level: number;

    @AutoMap()
    @Column({ default: 0 })
    levelExp: number;
}
