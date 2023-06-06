import { Controller, Get, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { resolve } from 'path';
import { NoGlobalAuth } from '../../common/decorators/no-global-auth.decorator';
import { HttpConfigService } from '../../common/processed-config/http-config.service';
import { CatsService } from './cats.service';
import { ReadCatOwnershipDto } from './dtos/read-cat-ownership.dto';
import { ReadCatDto } from './dtos/read-cat.dto';
import { ReadManyCatsDto } from './dtos/read-many-cats.dto';

@ApiTags('Cats')
@Controller('api/cats')
export class CatsController {
    constructor(private readonly service: CatsService, private readonly configService: HttpConfigService) {}

    @Get('')
    async readMany(@Paginate() query: PaginateQuery): Promise<ReadManyCatsDto> {
        return this.service.readAll(query);
    }

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

    /**
     * Spend feed to open a common cat case (lower probabilities for high-rarity cats).
     */
    @Post('case/common')
    async openCaseCommon(@Req() request: Request): Promise<ReadCatOwnershipDto> {
        return this.service.gachaCommon(request.user['id']);
    }

    /**
     * Spend catnip to open a legendary cat case (higher probabilities for high-rarity cats).
     */
    @Post('case/legendary')
    async openCaseLegendary(@Req() request: Request): Promise<ReadCatOwnershipDto> {
        return this.service.gachaLegendary(request.user['id']);
    }
}
