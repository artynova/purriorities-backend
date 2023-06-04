import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {CategoriesService} from "./categories.service";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}

}