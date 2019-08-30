import 'reflect-metadata';
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.PORT || 3500;
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.use(helmet());
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);

    Logger.log(`🚀 Servidor listo en http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
