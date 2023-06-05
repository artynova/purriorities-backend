import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { CatsModule } from './api/cats/cats.module';
import { UsersModule } from './api/users/users.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { IsAuthenticatedGuard } from './common/guards/is-authenticated.guard';
import { AuthConfigService } from './common/processed-config/auth-config.service';
import { CoreConfigService } from './common/processed-config/core-config.service';
import { DatabaseConfigService } from './common/processed-config/database-config.service';
import { HttpConfigService } from './common/processed-config/http-config.service';
import { OpenApiConfigService } from './common/processed-config/openapi-config.service';
import { ProcessedConfigModule } from './common/processed-config/processed-config.module';
import { CleanupModule } from './maintenance/cleanup/cleanup.module';
import {TasksModule} from "./api/tasks/tasks.module";
import {StagesModule} from "./api/stages/stages.module";
import {SkillsModule} from "./api/skills/skills.module";
import {QuestsModule} from "./api/quests/quests.module";
import {CategoriesModule} from "./api/categories/categories.module";
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

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
        TasksModule,
        StagesModule,
        SkillsModule,
        QuestsModule,
        CatsModule,
        CategoriesModule,
    ],
    providers: [
        AuthConfigService,
        CoreConfigService,
        DatabaseConfigService,
        HttpConfigService,
        OpenApiConfigService,
        {
            provide: APP_GUARD,
            useClass: IsAuthenticatedGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
