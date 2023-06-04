import {ReadManyDtoBase} from "../../../common/resource-base/read-many.dto-base";
import {ReadQuestDto} from "./read-quest.dto";

export class ReadManyQuestsDto extends ReadManyDtoBase<ReadQuestDto> {
    data: ReadQuestDto[];
}