import {Type} from 'class-transformer';
import {IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsUUID, Min, ValidateNested} from 'class-validator';
import {CreateStageDto} from '../../stages/dtos/create-stage.dto';
import {AutoMap} from "@automapper/classes";
import {Priority} from "../../../common/types/enums";

// export class CreateQuestDto extends PickType(Quest, ['name', 'priority', 'deadline', 'deadlineSetDate', 'limit']) {
//     @IsUUID()
//     categoryId: string;
//
//     @IsUUID(undefined, { each: true })
//     skillIds: string[];
//
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => CreateStageDto)
//     stages: CreateStageDto[];
// }

export class CreateQuestDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsEnum(Priority)
    priority: Priority;

    @AutoMap()
    @IsDate()
    @IsOptional()
    deadline?: Date;

    @AutoMap()
    @IsDate()
    @IsOptional()
    deadlineSetDate?: Date;

    @AutoMap()
    @IsDate()
    @IsOptional()
    limit?: Date;

    @AutoMap()
    @IsInt()
    @Min(0)
    interval?: number;

    @AutoMap()
    @IsUUID()
    category: string;

    @AutoMap()
    @IsUUID(undefined, { each: true })
    skills: string[];

    @AutoMap()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateStageDto)
    stages: CreateStageDto[];
}