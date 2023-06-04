import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {SkillsService} from "./skills.service";

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
    constructor(private readonly service: SkillsService) {
    }

}