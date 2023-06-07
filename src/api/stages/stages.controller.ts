import { Controller } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { StagesService } from './stages.service';

@ApiTags('Stages')
@ApiCookieAuth('session')
@Controller('api/stages')
export class StagesController {
    constructor(private readonly service: StagesService) {}
}
