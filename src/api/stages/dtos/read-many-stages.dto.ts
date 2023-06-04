import {ReadManyDtoBase} from "../../../common/resource-base/read-many.dto-base";
import {ReadStageDto} from "./read-stage.dto";

export class ReadManyStagesDto extends ReadManyDtoBase<ReadStageDto> {
    data: ReadStageDto[];
}