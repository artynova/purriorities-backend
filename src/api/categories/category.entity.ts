import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { Quest } from '../quests/quest.entity';
import { User } from '../users/entities/user.entity';

@Entity('categories')
export class Category extends Resource {
    @Column()
    name: string;

    @Column({ default: false })
    inbox: boolean;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Quest, (quest) => quest.category)
    quests: Quest[];
}
