import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Quest } from '../quest.entity';
import { CreateQuestDto } from './create-quest.dto';

export class UpdateQuestDto extends IntersectionType(
    OmitType(PartialType(CreateQuestDto), ['stages']),
    PickType(Quest, ['finishDate']),
) {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateQuestDto)
    stages: UpdateQuestDto[];
}
