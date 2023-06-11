import {IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import {CreateTaskDto} from "../../tasks/dtos/create-task.dto";
import {Type} from "class-transformer";
import {AutoMap} from "@automapper/classes";

// export class CreateStageDto extends PickType(Stage, [
//     'name',
//     'index',
// ]) {
//     @IsArray()
//     @ValidateNested({each: true})
//     @Type(() => CreateTaskDto)
//     tasks: CreateTaskDto[];
// }

export class CreateStageDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsInt()
    @IsOptional()
    index?: number;

    @AutoMap(() => [CreateTaskDto])
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateTaskDto)
    tasks: CreateTaskDto[];
}