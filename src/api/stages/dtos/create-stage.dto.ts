import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateTaskDto } from '../../tasks/dtos/create-task.dto';

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
    @IsOptional()
    @IsInt()
    index?: number;

    @AutoMap(() => [CreateTaskDto])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTaskDto)
    tasks: CreateTaskDto[];
}
