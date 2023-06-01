import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class OpenApiConfigService {
    constructor(private configService: ConfigService) {}

    get documentBuilder(): DocumentBuilder {
        return new DocumentBuilder().setTitle(this.title).setDescription(this.description).setVersion(this.version);
    }

    get version() {
        return this.configService.get<string>('openapi.version');
    }

    get title() {
        return this.configService.get<string>('openapi.title');
    }

    get description() {
        return this.configService.get<string>('openapi.description');
    }

    get excludedSchemas() {
        return this.configService.get<string[]>('openapi.excludedSchemas');
    }
}
