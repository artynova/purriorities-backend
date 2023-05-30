import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.skills)
    user: User;

    @Column()
    name: string;

    @Column({ default: 0 })
    level: number;

    @Column({ default: 0 })
    levelExp: number;
}
