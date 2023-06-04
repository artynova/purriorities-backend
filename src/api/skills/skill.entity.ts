import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Resource } from '../../common/resource-base/resource.entity-base';

@Entity('skills')
export class Skill extends Resource {
    @Column({ length: 36 })
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
