import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { existsSync } from 'fs';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { resolve } from 'path';
import { NoGlobalAuth } from '../../common/decorators/no-global-auth.decorator';
import { HttpConfigService } from '../../common/processed-config/http-config.service';
import { CatsService } from './cats.service';
import { ReadCatDto } from './dtos/read-cat.dto';
import { ReadManyCatsDto } from './dtos/read-many-cats.dto';

@ApiTags('Cats')
@Controller('api/cats')
export class CatsController {
    constructor(private readonly service: CatsService, private readonly configService: HttpConfigService) {}

    @ApiCookieAuth('session')
    @Get('')
    async readMany(@Paginate() query: PaginateQuery): Promise<ReadManyCatsDto> {
        return this.service.readAll(query);
    }

    @ApiCookieAuth('session')
    @Get(':id')
    async readOne(@Param('id') id: string): Promise<ReadCatDto> {
        return this.service.readOne(id);
    }

    @NoGlobalAuth()
    @Get(':id/image')
    getImage(@Param('id') id: string, @Res() res: Response) {
        if (!existsSync(resolve(this.configService.catPicturesPath, id + '.webp')))
            throw new NotFoundException('Image not found');
        return res.sendFile(id + '.webp', { root: this.configService.catPicturesPath });
    }
}
