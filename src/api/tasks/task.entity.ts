import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../stages/stage.entity';
import {IsInt, IsPositive} from "class-validator";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @IsInt()
    @IsPositive()
    minutes: number;

    @ManyToOne(() => Stage, (stage) => stage.tasks, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    stage: Stage;

    @CreateDateColumn()
    createDate: Date;

    @DeleteDateColumn({default: null})
    finishDate?: Date;
}
