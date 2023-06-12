import { AutoMap } from '@automapper/classes';
import { Lateness, Priority } from 'src/common/types/enums';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Resource } from '../../../common/resource-base/resource.entity-base';
import { Category } from '../../categories/entities/category.entity';
import { Stage } from '../../stages/entities/stage.entity';
import { QuestSkill } from './quest-skill.entity';

@Entity('quests')
export class Quest extends Resource {
    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    categoryId: string;

    @AutoMap(() => Category)
    @ManyToOne(() => Category, (category) => category.quests, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @AutoMap(() => [QuestSkill])
    @OneToMany(() => QuestSkill, (questSkill) => questSkill.quest)
    questSkills: QuestSkill[];

    @AutoMap()
    @Column({ type: 'enum', enum: Priority })
    priority: Priority;

    @AutoMap()
    @Column({ nullable: true })
    deadlineSetDate?: Date;

    @AutoMap()
    @Column({ nullable: true })
    deadline?: Date;

    @AutoMap()
    @Column({ nullable: true })
    limit?: Date;

    @AutoMap()
    @Column({ nullable: true, type: 'int' })
    interval?: number;

    @AutoMap(() => [Stage])
    @OneToMany(() => Stage, (stage) => stage.quest)
    stages: Stage[];

    @AutoMap()
    @DeleteDateColumn({ default: null })
    finishDate?: Date;

    get editingLateness(): Lateness {
        if (!this.deadline || new Date() <= this.deadline) return Lateness.EARLY;
        return Lateness.OVERDUE;
    }
}
