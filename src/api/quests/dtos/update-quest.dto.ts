import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    Min,
    ValidateNested
} from 'class-validator';
import { Priority } from '../../../common/types/enums';
import { CreateStageDto } from '../../stages/dtos/create-stage.dto';
import {UpdateStageDto} from "../../stages/dtos/update-stage.dto";

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
    @IsDateString()
    @IsOptional()
    deadline?: string;

    @AutoMap()
    @IsDateString()
    @IsOptional()
    limit?: string;

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

    @AutoMap(() => [UpdateStageDto])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateStageDto)
    stages: UpdateStageDto[];
}
