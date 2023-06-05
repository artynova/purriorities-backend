import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('RequestLogger');

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;

        this.logger.verbose(`IP address: ${ip}, Method: ${method}, URL: ${originalUrl}`);

        next();
    }
}
