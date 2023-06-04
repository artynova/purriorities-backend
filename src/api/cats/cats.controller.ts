import {Controller} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CatsService} from "./cats.service";

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
    constructor(private readonly service: CatsService) {}

}