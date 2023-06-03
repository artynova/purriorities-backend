import {IntersectionType, PartialType, PickType} from "@nestjs/swagger";
import {CreateTaskDto} from "./create-task.dto";
import {IsOptional, IsUUID} from "class-validator";
import {Task} from "../task.entity";

export class UpdateTaskDto extends IntersectionType(
    PartialType(CreateTaskDto),
    PickType(Task, ['finishDate'])
) {
    @IsUUID()
    @IsOptional()
    stageId?: string;
}