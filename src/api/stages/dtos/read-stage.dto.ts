import {ReadTaskDto} from "../../tasks/dtos/read-task.dto";
import {AutoMap} from "@automapper/classes";

// export class ReadStageDto extends PickType(Stage, [
//     'id',
//     'name',
//     'index',
// ]) {
//     @IsUUID()
//     questId: string;
//
//     @IsArray()
//     @ValidateNested({each: true})
//     @Type(() => ReadTaskDto)
//     tasks: ReadTaskDto[]
// }

export class ReadStageDto {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    questId: string;

    @AutoMap()
    tasks: ReadTaskDto[];

    @AutoMap()
    isFinished: boolean;
}