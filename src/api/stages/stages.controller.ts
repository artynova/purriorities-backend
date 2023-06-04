import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {StagesService} from "./stages.service";

@ApiTags('Stages')
@Controller('stages')
export class StagesController {
    constructor(private readonly service: StagesService) {}

}