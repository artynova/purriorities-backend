import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../stages/stage.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Stage, (stage) => stage.tasks, {
        onDelete: 'CASCADE',
    })
    stage: Stage;

    @CreateDateColumn()
    createDate: Date;
}
