import {NestFactory} from '@nestjs/core';
import {SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {CoreConfigService} from './common/processed-config/core-config.service';
import {HttpConfigService} from './common/processed-config/http-config.service';
import {OpenApiConfigService} from './common/processed-config/openapi-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: {}});

    // Changed it because followed instructions in environment.yaml and made all the config there
    //
    if (app.get(CoreConfigService).env === 'development') {
    //if (app.get(CoreConfigService).env === 'environment') {
        const openApiConfig = app.get(OpenApiConfigService);
        const builder = openApiConfig.documentBuilder.build();
        const document = SwaggerModule.createDocument(app, builder);
        openApiConfig.excludedSchemas.forEach((schema) => {
            delete document.components.schemas[schema];
        });
        SwaggerModule.setup('api', app, document);
    }

    await app.listen(app.get(HttpConfigService).port);
}

bootstrap();
