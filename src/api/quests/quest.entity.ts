import { Check, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Stage } from '../stages/stage.entity';
import { QuestSkill } from './quest-skill.entity';

@Entity('quests')
@Check('deadline IS NOT NULL OR (deadline IS NULL AND limit IS NULL)')
export class Quest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Category, (category) => category.quests)
    @JoinColumn()
    category: Category;

    @ManyToMany(() => QuestSkill, (questSkill) => questSkill.quest)
    questSkills: QuestSkill[];

    @Column({ type: 'tinyint' })
    priority: number;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ nullable: true })
    limit: Date;

    @OneToMany(() => Stage, (stage) => stage.quest)
    stages: Stage[];
}
