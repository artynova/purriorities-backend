import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quest } from '../quests/quest.entity';
import { Task } from '../tasks/task.entity';

@Entity('stages')
export class Stage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    index: number;

    @ManyToOne(() => Quest, (quest) => quest.stages, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    quest: Quest;

    @OneToMany(() => Task, (task) => task.stage)
    tasks: Task[];

    @DeleteDateColumn({default: null})
    finishDate?: Date;
}
