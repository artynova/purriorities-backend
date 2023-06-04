import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Resource} from '../../common/resource-base/resource.entity-base';
import {Stage} from '../stages/stage.entity';

@Entity('tasks')
export class Task extends Resource {
    @Column()
    name: string;

    @Column()
    minutes: number;

    @Column({ length: 36 })
    stageId: string;

    @ManyToOne(() => Stage, (stage) => stage.tasks, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'stageId' })
    stage: Stage;

    @CreateDateColumn()
    createDate: Date;

    @DeleteDateColumn({ default: null })
    finishDate?: Date;
}
