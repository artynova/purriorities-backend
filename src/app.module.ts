import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreConfigService } from './common/processed-config/core-config.service';
import { DatabaseConfigService } from './common/processed-config/database-config.service';
import { HttpConfigService } from './common/processed-config/http-config.service';
import { OpenApiConfigService } from './common/processed-config/openapi-config.service';
import { ProcessedConfigModule } from './common/processed-config/processed-config.module';
import { CleanupModule } from './maintenance/cleanup/cleanup.module';

@Module({
    imports: [
        ProcessedConfigModule,
        TypeOrmModule.forRootAsync({
            inject: [DatabaseConfigService],
            useFactory: (configService: DatabaseConfigService) => configService.options,
        }),
        ServeStaticModule.forRootAsync({
            inject: [HttpConfigService],
            useFactory: (configService: HttpConfigService) => [
                {
                    rootPath: configService.serveStaticPath,
                },
            ],
        }),
        ScheduleModule.forRoot(),
        CleanupModule,
    ],
    controllers: [],
    providers: [CoreConfigService, DatabaseConfigService, HttpConfigService, OpenApiConfigService],
})
export class AppModule {}
