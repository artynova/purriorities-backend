import {IsInt, IsNotEmpty, IsOptional, IsUUID, Min} from "class-validator";
import {AutoMap} from "@automapper/classes";

// export class UpdateTaskDto extends IntersectionType(
//     PartialType(CreateTaskDto),
//     PickType(Task, ['finishDate'])
// ) {
//     @IsUUID()
//     @IsOptional()
//     stageId?: string;
// }

export class UpdateTaskDto {
    @AutoMap()
    @IsUUID()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @AutoMap()
    @IsInt()
    @Min(0)
    @IsOptional()
    minutes?: number;
}