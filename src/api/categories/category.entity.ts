import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quest } from '../quests/quest.entity';
import { User } from '../users/user.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn()
    user: User;

    @OneToMany(() => Quest, (quest) => quest.category)
    quests: Quest[];
}
