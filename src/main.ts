import { ENV_PATH } from './constants/paths';
import { config } from 'dotenv';
config({ path: ENV_PATH });

import { adjustNodeEnv, loadAppVersion } from './helpers/env.helper';
adjustNodeEnv();
loadAppVersion();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './constants/app-settings';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        const config = new DocumentBuilder()
            .setTitle('Purriorities API')
            .setDescription(
                'The API for the Purriorities gamified task manager.',
            )
            .setVersion(process.env.APP_VERSION)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }

    await app.listen(PORT);
}
bootstrap();
