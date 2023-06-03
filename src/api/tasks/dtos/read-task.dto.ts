import {PickType} from "@nestjs/swagger";
import {Task} from "../task.entity";
import {IsUUID} from "class-validator";

export class ReadTaskDto extends PickType(Task, [
    'id',
    'name',
    'minutes',
]) {
    @IsUUID()
    stageId: string;
}