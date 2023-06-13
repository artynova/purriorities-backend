import { AutoMap } from '@automapper/classes';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

// export class CreateTaskDto extends PickType(Task, [
//     'name',
//     'minutes',
// ]) {}

export class CreateTaskDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsInt()
    @Min(0)
    minutes: number;
}
