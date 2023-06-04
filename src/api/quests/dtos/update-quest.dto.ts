import {Type} from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsUUID, Min,
    ValidateNested
} from 'class-validator';
import {AutoMap} from "@automapper/classes";
import {Priority} from "../../../common/types/enums";
import {CreateStageDto} from "../../stages/dtos/create-stage.dto";

// export class UpdateQuestDto extends IntersectionType(
//     OmitType(PartialType(CreateQuestDto), ['stages']),
//     PickType(Quest, ['finishDate']),
// ) {
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => UpdateQuestDto)
//     stages: UpdateQuestDto[];
// }

export class UpdateQuestDto {
    @AutoMap()
    @IsUUID()
    id: string;

    @AutoMap()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @AutoMap()
    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

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
    @IsOptional()
    category?: string;

    @AutoMap()
    @IsUUID(undefined, { each: true })
    @IsOptional()
    skills?: string[];

    @AutoMap()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateStageDto)
    stages: CreateStageDto[];
}
