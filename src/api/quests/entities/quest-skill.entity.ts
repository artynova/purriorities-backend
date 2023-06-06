import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Skill} from '../../skills/skill.entity';
import {Quest} from './quest.entity';
import {Resource} from "../../../common/resource-base/resource.entity-base";
import {AutoMap} from "@automapper/classes";

@Entity('quest_skills')
export class QuestSkill extends Resource {
    @AutoMap()
    @Column()
    index: number; // index starting from 0

    @AutoMap()
    @Column()
    questId: string;

    @AutoMap(() => Quest)
    @ManyToOne(() => Quest, (quest) => quest.questSkills, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'questId' })
    quest: Quest;

    @AutoMap()
    @Column()
    skillId: string;

    @AutoMap(() => Skill)
    @ManyToOne(() => Skill, {
        onDelete: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({ name: 'skillId' })
    skill: Skill;
}
