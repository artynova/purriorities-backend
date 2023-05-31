import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreConfigService } from './core-config.service';
import { DatabaseConfigService } from './database-config.service';
import { HttpConfigService } from './http-config.service';
import { LogicConfigService } from './logic-config.service';
import { OpenApiConfigService } from './openapi-config.service';
import { commonSource, environmentSource } from './sources';

@Global()
@Module({
    imports: [ConfigModule.forRoot({ load: [environmentSource, commonSource], isGlobal: true })],
    providers: [CoreConfigService, DatabaseConfigService, HttpConfigService, LogicConfigService, OpenApiConfigService],
    exports: [CoreConfigService, DatabaseConfigService, HttpConfigService, LogicConfigService, OpenApiConfigService],
})
export class ProcessedConfigModule {}
