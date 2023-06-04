import { DataSourceOptions } from 'typeorm';
import { DatabaseSettings } from '../types/database';

export function dataSourceOptions(settings: DatabaseSettings, environment: string): DataSourceOptions {
    return {
        type: 'postgres',
        host: settings.host,
        port: settings.port,
        username: settings.username,
        password: settings.password,
        database: settings.database,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: environment !== 'production',
    };
}
