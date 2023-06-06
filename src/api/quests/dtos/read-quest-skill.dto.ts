import {AutoMap} from "@automapper/classes";

export class ReadQuestSkillDto {
    @AutoMap()
    id: string;

    @AutoMap()
    index: number;

    @AutoMap()
    questId: string;

    @AutoMap()
    skillId: string;
}