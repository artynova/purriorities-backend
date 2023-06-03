import {Stage} from "../stage.entity";
import {PickType} from "@nestjs/swagger";
import {IsArray, ValidateNested} from "class-validator";
import {CreateTaskDto} from "../../tasks/dtos/create-task.dto";
import {Type} from "class-transformer";


export class CreateStageDto extends PickType(Stage, [
    'name',
    'index',
]) {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateTaskDto)
    tasks: CreateTaskDto[];
}