import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nest-modules/mailer';
import { classToPlain } from 'class-transformer';
import { IAuth } from '@control/api/interfaces/auth.interface';
import { AuthDto } from '@control/api/dto/auth.dto';
import { UserService } from '@control/api/services/user.service';
import { IUser } from '@control/api/interfaces/user.interface';
import { IForgottenPassword } from '@control/api/interfaces/forgotten-password.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jws: JwtService,
                private readonly mailerService: MailerService) {
    }

    public async login(authDto: AuthDto): Promise<IUser> {
        const { email, password } = authDto;
        const user = await this.userService.getUser('contact.email', email);
        if(!user || !(await user.validatePassword(password))) {
            throw new UnauthorizedException('Email ó Contraseña incorrectos.', 'No autorizado');
        }
        return this.userService.updateToken(user.id, '');
    }

    public async token(payload: IUser): Promise<IUser> {
        const token = await this.jws.sign(classToPlain(payload));
        return await this.userService.updateToken(payload.id, token);
    }

    public validateUser(payload: IUser): Promise<IUser> {
        return this.userService.getUser('contact.email',payload.staff.contact.email);
    }

    public async emailToken(email: string): Promise<boolean> {
        const emailVerification = await this.userService.getUser('contact.email', email);
        if (emailVerification && ((new Date().getTime() - emailVerification.createdAt.getTime()) / 60000 < 15)) {
            throw new InternalServerErrorException('CORREO ELECTRÓNICO ENVIADO RECIENTEMENTE');
        } else {
            return true;
        }
    }

    public async createTokenForgotKey(email: string): Promise<IForgottenPassword> {
        const claveOlvidada = await this.userService.getUser('contact.email', email);
        if (claveOlvidada && ((new Date().getTime() - claveOlvidada.createdAt.getTime()) / 60000 < 15)) {
            throw new InternalServerErrorException('CORREO ELECTRÓNICO ENVIADO RECIENTEMENTE');
        } else {
            return {
                email,
                token: Math.floor(Math.random() * (9000000)) + 1000000,
                date: new Date(),
            } as IForgottenPassword;
        }
    }

    public async sendEmailForgotPassword(email: string): Promise<boolean> {
        const usuario = await this.userService.getUser('contact.email', email);
        if (!usuario) throw new NotFoundException(`El usuario con el email: ${email} no se encontró.`);

        const forgottenPassword = await this.createTokenForgotKey(email);
        if (forgottenPassword && forgottenPassword.token) {
            return await new Promise<boolean>(async (resolve, reject) => {
                await this.mailerService.sendMail({
                    to: email,
                    from: 'lionelsh.salazar@gmail.com',
                    subject: 'Clave Olvidada',
                    template: 'clave-olvidada',
                    context: {
                        host: 'http://localhost:3500/autenticacion/reestablecer-clave/' + forgottenPassword.token.toString(),
                        token: forgottenPassword.token,
                    },
                })
                    .then(e => resolve(true))
                    .catch(e => reject(false));
            });
        } else {
            throw new ForbiddenException('Usuario no registrado.');
        }
    }
}
