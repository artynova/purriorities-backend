import { AutoMap } from '@automapper/classes';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Resource } from '../../../common/resource-base/resource.entity-base';
import { Quest } from '../../quests/entities/quest.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('stages')
export class Stage extends Resource {
    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    index: number;

    @AutoMap()
    @Column()
    questId: string;

    @AutoMap(() => Quest)
    @ManyToOne(() => Quest, (quest) => quest.stages, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'questId' })
    quest: Quest;

    @AutoMap(() => [Task])
    @OneToMany(() => Task, (task) => task.stage)
    tasks: Task[];

    @AutoMap()
    @DeleteDateColumn({ default: null })
    finishDate?: Date;
}
