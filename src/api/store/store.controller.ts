import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCookieAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { ReadCatOwnershipDto } from '../cats/dtos/read-cat-ownership.dto';
import { StorePricingDto } from './dtos/store-pricing.dto';
import { StoreService } from './store.service';

@ApiCookieAuth('session')
@ApiTags('Store')
@Controller('api/store')
export class StoreController {
    constructor(private readonly service: StoreService) {}

    /**
     * Spend feed to open a common cat case (lower probabilities for high-rarity cats).
     */
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('case/common')
    async openCaseCommon(@Req() request: Request): Promise<ReadCatOwnershipDto> {
        return this.service.gachaCommon(request.user['id']);
    }

    /**
     * Spend catnip to open a legendary cat case (higher probabilities for high-rarity cats).
     */
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('case/legendary')
    async openCaseLegendary(@Req() request: Request): Promise<ReadCatOwnershipDto> {
        return this.service.gachaLegendary(request.user['id']);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('buy-feed')
    async buyFeed(@Req() request: Request) {
        await this.service.buyFeedForCatnip(request.user['id']);
    }

    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @Post('return-cat/:id')
    async returnCat(@Req() request: Request, @Param('id') id: string) {
        await this.service.returnCat(request.user['id'], id);
    }

    @ApiUnauthorizedResponse()
    @Get('pricing')
    async getPricing(): Promise<StorePricingDto> {
        return this.service.getPricing();
    }
}
