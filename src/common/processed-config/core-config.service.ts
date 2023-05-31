import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreConfigService {
    constructor(private configService: ConfigService) {}

    get env() {
        return this.configService.get<string>('env');
    }
}
