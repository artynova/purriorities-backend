import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { DATA_SOURCE_OPTIONS } from './constants/data-source-options';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SERVE_STATIC_PATH } from './constants/paths';

@Module({
    imports: [
        TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS),
        ServeStaticModule.forRoot({ rootPath: SERVE_STATIC_PATH }),
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
