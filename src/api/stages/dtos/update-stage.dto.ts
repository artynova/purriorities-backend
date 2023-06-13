import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UpdateTaskDto } from '../../tasks/dtos/update-task.dto';

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
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @AutoMap()
    @IsOptional()
    @IsInt()
    index?: number;

    @AutoMap(() => [UpdateTaskDto])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateTaskDto)
    tasks: UpdateTaskDto[];
}
