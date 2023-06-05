import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
import { Session } from './api/auth/entities/session.entity';
import { AppModule } from './app.module';
import { AuthConfigService } from './common/processed-config/auth-config.service';
import { CoreConfigService } from './common/processed-config/core-config.service';
import { DatabaseConfigService } from './common/processed-config/database-config.service';
import { HttpConfigService } from './common/processed-config/http-config.service';
import { OpenApiConfigService } from './common/processed-config/openapi-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'debug', 'error', 'verbose', 'warn'],
    });
    app.enableCors(app.get(CoreConfigService).env === 'development' ? { origin: true, credentials: true } : undefined);

    setupOpenApi(app);

    await setupSessions(app);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(app.get(HttpConfigService).port, app.get(HttpConfigService).host);
}

function setupOpenApi(app: INestApplication) {
    if (app.get(CoreConfigService).env === 'development') {
        const openApiConfig = app.get(OpenApiConfigService);
        const builder = openApiConfig.documentBuilder.build();
        const document = SwaggerModule.createDocument(app, builder);
        openApiConfig.excludedSchemas.forEach((schema) => {
            delete document.components.schemas[schema];
        });
        SwaggerModule.setup('api', app, document);
    }
}

async function setupSessions(app: INestApplication) {
    const authConfig = app.get(AuthConfigService);
    const databaseConfig = app.get(DatabaseConfigService);
    const dataSource = new DataSource(databaseConfig.options);
    await dataSource.initialize();
    const typeormStore = new TypeormStore({
        cleanupLimit: authConfig.sessionCleanupLimit,
        ttl: authConfig.sessionTtl,
    });
    typeormStore.connect(dataSource.getRepository(Session));
    app.use(
        session({
            secret: authConfig.cookieSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: app.get(CoreConfigService).env === 'production',
                path: '/',
            },
            store: typeormStore,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
}

bootstrap();
