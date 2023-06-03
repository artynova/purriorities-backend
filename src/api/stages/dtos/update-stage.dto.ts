import {IntersectionType, OmitType, PartialType, PickType} from "@nestjs/swagger";
import {CreateStageDto} from "./create-stage.dto";
import {Stage} from "../stage.entity";
import {UpdateTaskDto} from "../../tasks/dtos/update-task.dto";
import {Type} from "class-transformer";
import {IsArray, ValidateNested} from "class-validator";

export class UpdateStageDto extends IntersectionType(
    OmitType(PartialType(CreateStageDto), ['tasks']),
    PickType(Stage, ['finishDate'])
) {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateTaskDto)
    tasks: UpdateTaskDto[];
}