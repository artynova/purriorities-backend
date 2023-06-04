import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from '../helpers/database';
import { DatabaseSettings } from '../types/database';

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get options(): DataSourceOptions {
        return dataSourceOptions(this.configService.get<DatabaseSettings>('database'), this.configService.get<string>('env'));
    }
}
