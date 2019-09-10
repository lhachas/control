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
        const usuario = await this.userService.getUser(email);
        if(!usuario || !(await usuario.validatePassword(password))) {
            throw new UnauthorizedException('Usuario ó Clave incorrectos.', 'No autorizado');
        }
        await this.userService.saveToken(usuario.id, '');
        return await this.userService.getUser(email);
    }

    public async token(payload: IUser): Promise<IUser> {
        const token = await this.jws.sign(classToPlain(payload));
        await this.userService.saveToken(payload.id, token);
        return this.validateUser(payload);
    }

    public validateUser(payload: IUser): Promise<IUser> {
        return this.userService.getUser(payload.staff.contact.email);
    }

    public async emailToken(email: string): Promise<boolean> {
        const emailVerification = await this.userService.getUser(email);
        if (emailVerification && ((new Date().getTime() - emailVerification.createdAt.getTime()) / 60000 < 15)) {
            throw new InternalServerErrorException('CORREO ELECTRÓNICO ENVIADO RECIENTEMENTE');
        } else {
            return true;
        }
    }

    public async createTokenForgotKey(email: string): Promise<IForgottenPassword> {
        const claveOlvidada = await this.userService.getUser(email);
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

    public async sendEmailForgotKey(email: string): Promise<boolean> {
        const usuario = await this.userService.getUser(email);
        if (!usuario) throw new NotFoundException(`El usuario con el email: ${email} no se encontró.`);

        const tokenClaveOlvidada = await this.createTokenForgotKey(email);
        if (tokenClaveOlvidada && tokenClaveOlvidada.token) {
            return await new Promise<boolean>(async (resolve, reject) => {
                await this.mailerService.sendMail({
                    to: email,
                    from: 'lionelsh.salazar@gmail.com',
                    subject: 'Clave Olvidada',
                    template: 'clave-olvidada',
                    context: {
                        host: 'http://localhost:3500/autenticacion/reestablecer-clave/' + tokenClaveOlvidada.token.toString(),
                        token: tokenClaveOlvidada.token,
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
