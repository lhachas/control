import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '@control/api/services/usuario.service';
import { IUsuario } from '@control/api/interfaces/usuario.interface';
import { IAutenticacion } from '@control/api/interfaces/autenticacion.interface';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';

@Injectable()
export class AutenticacionService {
    constructor(private readonly usuarioService: UsuarioService,
                private readonly jws: JwtService) {
    }

    public async iniciarSesion(autenticacionDto: AutenticacionDto): Promise<IUsuario> {
        const { email, clave } = autenticacionDto;
        const usuario = await this.usuarioService.getUsuario({
            email,
        });

        if(!usuario || !(await usuario.validaClave(clave))) {
            throw new HttpException({ mensaje: 'Correo o contraseña incorrectos. Inténtalo de nuevo.'}, HttpStatus.UNAUTHORIZED);
            // throw new UnauthorizedException();
        }

        return {
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            rol: usuario.rol,
            email: usuario.email,
        } as IUsuario;
    }

    public async generarToken(autenticacionDto: AutenticacionDto): Promise<IAutenticacion> {
        const { id, nombreUsuario, email, rol, estado } = await this.usuarioService.getUsuario({
            email: autenticacionDto.email,
        });
        const hoy = new Date();
        const exp = new Date(hoy);
        exp.setDate(hoy.getDate() + 60);

        const token = await this.jws.sign({
            id,
            nombreUsuario,
            email,
            rol,
            estado,
            // exp: exp.getTime() / 1000,
        });
        return {
            token,
        } as IAutenticacion;
    }
}
