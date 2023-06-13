import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    Min,
    ValidateNested,
} from 'class-validator';
import { Priority } from '../../../common/types/enums';
import { UpdateStageDto } from '../../stages/dtos/update-stage.dto';

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
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @AutoMap()
    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;

    @AutoMap()
    @IsOptional()
    @IsDateString()
    deadline?: string;

    @AutoMap()
    @IsOptional()
    @IsDateString()
    limit?: string;

    @AutoMap()
    @IsOptional()
    @IsInt()
    @Min(0)
    interval?: number;

    @AutoMap()
    @IsOptional()
    @IsUUID()
    category?: string;

    @AutoMap()
    @IsOptional()
    @IsUUID(undefined, { each: true })
    skills?: string[];

    @AutoMap(() => [UpdateStageDto])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateStageDto)
    stages: UpdateStageDto[];
}
