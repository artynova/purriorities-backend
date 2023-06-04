import {AutoMap} from "@automapper/classes";

// export class ReadTaskDto extends PickType(Task, [
//     'id',
//     'name',
//     'minutes',
// ]) {
//     @IsUUID()
//     stageId: string;
// }

export class ReadTaskDto {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    minutes: number;

    @AutoMap()
    stageId: string;

    @AutoMap()
    isFinished: boolean;
}