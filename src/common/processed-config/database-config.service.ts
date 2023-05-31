import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get options(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('database.host'),
            port: this.configService.get<number>('database.port'),
            username: this.configService.get<string>('database.username'),
            password: this.configService.get<string>('database.password'),
            database: this.configService.get<string>('database.database'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: this.configService.get<string>('env') !== 'production',
        };
    }
}
