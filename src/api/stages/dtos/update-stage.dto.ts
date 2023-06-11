import {UpdateTaskDto} from "../../tasks/dtos/update-task.dto";
import {Type} from "class-transformer";
import {IsArray, IsInt, IsNotEmpty, IsOptional, IsUUID, Min, ValidateNested} from "class-validator";
import {AutoMap} from "@automapper/classes";

// export class UpdateStageDto extends IntersectionType(
//     OmitType(PartialType(CreateStageDto), ['tasks']),
//     PickType(Stage, ['finishDate'])
// ) {
//     @IsArray()
//     @ValidateNested({each: true})
//     @Type(() => UpdateTaskDto)
//     tasks: UpdateTaskDto[];
// }

export class UpdateStageDto {
    @AutoMap()
    @IsUUID()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @AutoMap()
    @IsInt()
    @IsOptional()
    index?: number;

    @AutoMap(() => [UpdateTaskDto])
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateTaskDto)
    tasks: UpdateTaskDto[];
}