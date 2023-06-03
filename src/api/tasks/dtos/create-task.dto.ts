import {PickType} from "@nestjs/swagger";
import {Task} from "../task.entity";

export class CreateTaskDto extends PickType(Task, [
    'name',
    'minutes',
]) {}