import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { ReadCatOwnershipDto } from './dtos/read-cat-ownership.dto';

@ApiTags('Cats')
@Controller('api/cats')
export class CatsController {
    constructor(private readonly service: CatsService) {}

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
