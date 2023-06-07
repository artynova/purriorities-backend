import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Skill } from '../../skills/skill.entity';
import { Quest } from './quest.entity';

@Entity('quest_skills')
export class QuestSkill {
    @AutoMap()
    @Column()
    index: number; // index starting from 0

    @AutoMap()
    @PrimaryColumn()
    questId: string;

    @AutoMap(() => Quest)
    @ManyToOne(() => Quest, (quest) => quest.questSkills, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'questId' })
    quest: Quest;

    @AutoMap()
    @PrimaryColumn()
    skillId: string;

    @AutoMap(() => Skill)
    @ManyToOne(() => Skill, {
        onDelete: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({ name: 'skillId' })
    skill: Skill;
}
