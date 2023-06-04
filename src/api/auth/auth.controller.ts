import { Body, Controller, Delete, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { NoGlobalAuth } from '../../common/decorators/no-global-auth.decorator';
import { IsNotAuthenticatedGuard } from '../../common/guards/is-not-authenticated.guard';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiCreatedResponse()
    @ApiUnauthorizedResponse()
    @NoGlobalAuth()
    @UseGuards(IsNotAuthenticatedGuard, LocalAuthGuard)
    @Post('login')
    async login(@Body() body: LoginDto) {}

    @ApiCookieAuth('session')
    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Delete('logout')
    async logout(@Req() request: Request) {
        const error = await new Promise((resolve) =>
            request.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
        );
        if (error) throw new InternalServerErrorException('Something went wrong, cannot log out');
    }
}
