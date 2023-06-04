import { IsInt, IsPositive } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Resource } from '../../common/resource-base/resource.entity-base';
import { Stage } from '../stages/stage.entity';

@Entity('tasks')
export class Task extends Resource {
    @Column()
    name: string;

    @IsInt()
    @IsPositive()
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
