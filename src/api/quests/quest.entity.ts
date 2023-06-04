import { Lateness, Priority } from 'src/common/types/enums';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { getEditingLateness } from '../../common/helpers/punishments';
import { Category } from '../categories/category.entity';
import { Stage } from '../stages/stage.entity';
import { QuestSkill } from './quest-skill.entity';
import { Resource } from '../../common/resource-base/resource.entity-base';

@Entity('quests')
export class Quest extends Resource {
    @Column()
    name: string;

    @Column({ type: 'varchar', length: 36 })
    categoryId: string;

    @ManyToOne(() => Category, (category) => category.quests, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToMany(() => QuestSkill, (questSkill) => questSkill.quest)
    questSkills: QuestSkill[];

    @Column({ type: 'enum', enum: Priority })
    priority: Priority;

    @Column({ nullable: true })
    deadlineSetDate?: Date;

    @Column({ nullable: true })
    deadline?: Date;

    @Column({ nullable: true })
    limit?: Date;

    @Column({ nullable: true, type: 'int' })
    interval?: number;

    @OneToMany(() => Stage, (stage) => stage.quest)
    stages: Stage[];

    @DeleteDateColumn({ default: null })
    finishDate?: Date;

    get editingLateness(): Lateness {
        if (!this.deadline) return Lateness.EARLY;
        return getEditingLateness(this.deadlineSetDate, this.deadline, new Date());
    }
}
