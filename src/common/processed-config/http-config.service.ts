import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService {
    constructor(private configService: ConfigService) {}

    get host() {
        return this.configService.get<string>('http.host');
    }

    get port() {
        return this.configService.get<number>('http.port');
    }

    get serveStaticPath() {
        return this.configService.get<string>('http.serveStaticPath');
    }

    get catPicturesPath() {
        return this.configService.get<string>('http.catPicturesPath');
    }
}
