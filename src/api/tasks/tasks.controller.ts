import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {TasksService} from "./tasks.service";

//@ApiExtraModels(CreateUserDto) // TODO remove this when CreateUserDto is used properly in auth and displayed automatically, this is a crutch to forcibly display CreateUserDto in the api until then
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly service: TasksService) {}

}
