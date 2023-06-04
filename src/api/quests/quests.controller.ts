import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {QuestsService} from "./quests.service";

@ApiTags('Quests')
@Controller('quests')
export class QuestsController {
    constructor(private readonly service: QuestsService) {}

}