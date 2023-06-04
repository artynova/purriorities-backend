import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { User } from '../users/entities/user.entity';

@Entity('skills')
export class Skill extends Resource {
    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.skills, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    name: string;

    @Column({ default: 0 })
    level: number;

    @Column({ default: 0 })
    levelExp: number;
}
