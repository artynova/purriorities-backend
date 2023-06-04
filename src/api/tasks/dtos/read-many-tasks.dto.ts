import {ReadManyDtoBase} from "../../../common/resource-base/read-many.dto-base";
import {ReadTaskDto} from "./read-task.dto";

export class ReadManyTasksDto extends ReadManyDtoBase<ReadTaskDto> {
    data: ReadTaskDto[];
}