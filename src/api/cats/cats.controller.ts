import {Controller, Get, Param} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CatsService} from "./cats.service";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {ReadManyCatsDto} from "./dtos/read-many-cats.dto";
import {ReadCatDto} from "./dtos/read-cat.dto";

@ApiTags('Cats')
@Controller('api/cats')
export class CatsController {
    constructor(private readonly service: CatsService) {}

    @Get('')
    async readMany(@Paginate() query: PaginateQuery): Promise<ReadManyCatsDto> {
        return this.service.readAll(query);
    }

    @Get(':id')
    async readOne(@Param('id') id: string): Promise<ReadCatDto> {
        return this.service.readOne(id);
    }
}