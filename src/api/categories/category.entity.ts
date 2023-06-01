import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quest } from '../quests/quest.entity';
import { User } from '../users/entities/user.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: false })
    inbox: boolean;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => Quest, (quest) => quest.category)
    quests: Quest[];
}
