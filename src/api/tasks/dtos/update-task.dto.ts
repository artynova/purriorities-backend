import { AutoMap } from '@automapper/classes';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

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
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @AutoMap()
    @IsOptional()
    @IsInt()
    @Min(0)
    minutes?: number;
}
