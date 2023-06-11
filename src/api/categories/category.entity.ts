import {Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique} from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { Quest } from '../quests/entities/quest.entity';
import { User } from '../users/entities/user.entity';
import {AutoMap} from "@automapper/classes";

@Entity('categories')
@Unique(['userId', 'name'])
export class Category extends Resource {
    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column({ default: false })
    inbox: boolean;

    @AutoMap()
    @Column()
    userId: string;

    @AutoMap(() => User)
    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @AutoMap(() => [Quest])
    @OneToMany(() => Quest, (quest) => quest.category)
    quests: Quest[];
}
