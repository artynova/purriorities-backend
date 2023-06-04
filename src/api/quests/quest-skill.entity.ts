import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from '../skills/skill.entity';
import { Quest } from './quest.entity';

@Entity('quest_skills')
export class QuestSkill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    index: number; // index starting from 0

    @Column({ type: 'varchar', length: 36 })
    questId: string;

    @ManyToOne(() => Quest, (quest) => quest.questSkills, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'questId' })
    quest: Quest;

    @Column({ type: 'varchar', length: 36 })
    skillId: string;

    @ManyToOne(() => Skill, {
        onDelete: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({ name: 'skillId' })
    skill: Skill;
}
