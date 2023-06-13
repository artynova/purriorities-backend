import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @ApiHideProperty()
    userId: string;
}
