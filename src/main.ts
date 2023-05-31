import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CoreConfigService } from './common/processed-config/core-config.service';
import { HttpConfigService } from './common/processed-config/http-config.service';
import { OpenApiConfigService } from './common/processed-config/openapi-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (app.get(CoreConfigService).env === 'development') {
        const builder = app.get(OpenApiConfigService).documentBuilder.build();
        const document = SwaggerModule.createDocument(app, builder);
        SwaggerModule.setup('api', app, document);
    }

    await app.listen(app.get(HttpConfigService).port);
}
bootstrap();
