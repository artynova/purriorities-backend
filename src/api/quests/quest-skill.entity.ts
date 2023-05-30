import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Skill } from '../skills/skill.entity';
import { Quest } from './quest.entity';

@Entity('quest_skills')
export class QuestSkill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    index: number; // index starting from 0

    @ManyToOne(() => Quest, (quest) => quest.questSkills)
    quest: Quest;

    @ManyToOne(() => Skill)
    skill: Skill;
}
