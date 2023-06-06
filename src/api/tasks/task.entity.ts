import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { Stage } from '../stages/stage.entity';
import {AutoMap} from "@automapper/classes";

@Entity('tasks')
export class Task extends Resource {
    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    minutes: number;

    @AutoMap()
    @Column()
    stageId: string;

    @AutoMap(() => Stage)
    @ManyToOne(() => Stage, (stage) => stage.tasks, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'stageId' })
    stage: Stage;

    @AutoMap()
    @CreateDateColumn()
    createDate: Date;

    @AutoMap()
    @DeleteDateColumn({ default: null })
    finishDate?: Date;
}
