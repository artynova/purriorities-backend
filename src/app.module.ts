import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { DATA_SOURCE_OPTIONS } from './common/constants/data-source-options';
import { SERVE_STATIC_PATH } from './common/constants/paths';
import { CleanupModule } from './maintenance/cleanup/cleanup.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS),
        ServeStaticModule.forRoot({ rootPath: SERVE_STATIC_PATH }),
        ScheduleModule.forRoot(),
        CleanupModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
