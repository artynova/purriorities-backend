import { Controller, Param, Post, Req } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RewardDto } from '../users/dtos/reward.dto';
import { RefuseResponseDto } from './dtos/refuse-response.dto';
import { TasksService } from './tasks.service';

//@ApiExtraModels(CreateUserDto) // TODO remove this when CreateUserDto is used properly in auth and displayed automatically, this is a crutch to forcibly display CreateUserDto in the api until then
@ApiTags('Tasks')
@ApiCookieAuth('session')
@Controller('api/tasks')
export class TasksController {
    constructor(private readonly service: TasksService) {}

    @Post(':id/complete')
    async complete(@Param('id') id: string, @Req() request: Request): Promise<RewardDto> {
        await this.service.validateOwner(id, request.user['id']);
        return this.service.complete(id);
    }

    @Post(':id/refuse')
    async refuse(@Param('id') id: string, @Req() request: Request): Promise<RefuseResponseDto> {
        await this.service.validateOwner(id, request.user['id']);
        return this.service.refuse(id);
    }
}
