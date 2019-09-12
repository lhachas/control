import 'reflect-metadata';
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as passport from 'passport';
import flash = require('connect-flash');
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.PORT || 3500;
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.use(session({
        secret: 'leonelhs',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(helmet());
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);

    Logger.log(`🚀 Servidor listo en http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
