import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { CoreConfigService } from './common/processed-config/core-config.service';
import { DatabaseConfigService } from './common/processed-config/database-config.service';
import { HttpConfigService } from './common/processed-config/http-config.service';
import { OpenApiConfigService } from './common/processed-config/openapi-config.service';
import { ProcessedConfigModule } from './common/processed-config/processed-config.module';
import { CleanupModule } from './maintenance/cleanup/cleanup.module';
import { AuthConfigService } from './common/processed-config/auth-config.service';

@Module({
    imports: [
        ProcessedConfigModule,
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
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
        UsersModule,
        AuthModule,
    ],
    providers: [AuthConfigService, CoreConfigService, DatabaseConfigService, HttpConfigService, OpenApiConfigService],
})
export class AppModule {}
