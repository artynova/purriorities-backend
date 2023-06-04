import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { Quest } from '../quests/quest.entity';
import { Task } from '../tasks/task.entity';

@Entity('stages')
export class Stage extends Resource {
    @Column()
    name: string;

    @Column()
    index: number;

    @Column()
    questId: string;

    @ManyToOne(() => Quest, (quest) => quest.stages, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'questId' })
    quest: Quest;

    @OneToMany(() => Task, (task) => task.stage)
    tasks: Task[];

    @DeleteDateColumn({ default: null })
    finishDate?: Date;
}
