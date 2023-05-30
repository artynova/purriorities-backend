import { config } from 'dotenv';
import { ENV_PATH } from './common/constants/paths';
config({ path: ENV_PATH });

import { adjustNodeEnv, loadAppVersion } from './common/helpers/env';
adjustNodeEnv();
loadAppVersion();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { PORT } from './common/constants/app-settings';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        const config = new DocumentBuilder()
            .setTitle('Purriorities API')
            .setDescription('The API for the Purriorities gamified task manager.')
            .setVersion(process.env.APP_VERSION)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }

    await app.listen(PORT);
}
bootstrap();
