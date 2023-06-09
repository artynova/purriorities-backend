import {AutoMap} from "@automapper/classes";

export class ReadShortSkillDto {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;
}