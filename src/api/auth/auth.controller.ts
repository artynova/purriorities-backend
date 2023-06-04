import { Body, Controller, Delete, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiUnauthorizedResponse()
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body: LoginDto) {}

    @ApiCookieAuth('session')
    @ApiForbiddenResponse()
    @Delete('logout')
    async logout(@Req() request: Request) {
        const error = await new Promise((resolve) =>
            request.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
        );
        if (error) throw new InternalServerErrorException('Something went wrong, cannot log out');
    }
}
