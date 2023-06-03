import {PickType} from "@nestjs/swagger";
import {Stage} from "../stage.entity";
import {IsArray, IsUUID, ValidateNested} from "class-validator";
import {ReadTaskDto} from "../../tasks/dtos/read-task.dto";
import {Type} from "class-transformer";

export class ReadStageDto extends PickType(Stage, [
    'id',
    'name',
    'index',
]) {
    @IsUUID()
    questId: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ReadTaskDto)
    tasks: ReadTaskDto[]
}