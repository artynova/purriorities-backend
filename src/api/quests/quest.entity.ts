import { Lateness, Priority } from 'src/common/types/enums';
import {
    Check,
    Column,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { getEditingLateness } from '../../common/helpers/punishments';
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

    @ManyToOne(() => Category, (category) => category.quests, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    category: Category;

    @ManyToMany(() => QuestSkill, (questSkill) => questSkill.quest)
    questSkills: QuestSkill[];

    @Column({ type: 'enum', enum: Priority })
    priority: Priority;

    @Column({ nullable: true })
    deadlineSetDate: Date;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ nullable: true })
    limit: Date;

    @OneToMany(() => Stage, (stage) => stage.quest)
    stages: Stage[];

    @DeleteDateColumn()
    finishDate: Date;

    get editingLateness(): Lateness {
        if (!this.deadline) return Lateness.EARLY;
        return getEditingLateness(this.deadlineSetDate, this.deadline, new Date());
    }
}
