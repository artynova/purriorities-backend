import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ReadQuestDto } from '../../quests/dtos/read-quest.dto';
import { Category } from '../category.entity';

export class ReadCategoryDto extends OmitType(Category, ['user', 'quests']) {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReadQuestDto)
    quests: ReadQuestDto[];
}
