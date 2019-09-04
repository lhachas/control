import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlPassport } from '@control/api/auth/passport';
import { AuthService } from '@control/api/auth/auth.service';
import { AuthController } from '@control/api/auth/auth.controller';
import { ContactoService } from '@control/api/services/contacto.service';
import { PersonalService } from '@control/api/services/personal.service';
import { UsuarioService } from '@control/api/services/usuario.service';
import { ContactoModel } from '@control/api/models/contacto.model';
import { PersonalModel } from '@control/api/models/personal.model';
import { UsuarioModel } from '@control/api/models/usuario.model';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'leonelhs',
            signOptions: {
                expiresIn: '10d',
            },
        }),
        TypeOrmModule.forFeature([
            ContactoModel,
            PersonalModel,
            UsuarioModel,
        ]),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        ...ControlPassport,
        AuthService,
        UsuarioService,
        PersonalService,
        ContactoService,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule {}
