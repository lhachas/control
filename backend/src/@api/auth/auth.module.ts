import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlPassport } from '@control/api/auth/passport';
import { SessionSerializer } from '@control/api/auth/session/serializer.session';
import { AuthService } from '@control/api/auth/auth.service';
import { AuthController } from '@control/api/auth/auth.controller';
import { UserService } from '@control/api/services/user.service';
import { UserModel } from '@control/api/models/user.model';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            session: true,
        }),
        JwtModule.register({
            secret: 'leonelhs',
            signOptions: {
                expiresIn: '10d',
            },
        }),
        TypeOrmModule.forFeature([
            UserModel,
        ]),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        ...ControlPassport,
        SessionSerializer,
        AuthService,
        UserService,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
        consumer
            .apply()
            .forRoutes(AuthController);
    }
}
