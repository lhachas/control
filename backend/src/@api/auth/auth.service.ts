import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsuario } from '@control/api/interfaces/usuario.interface';
import { IAutenticacion } from '@control/api/interfaces/autenticacion.interface';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';
import { UsuarioService } from '@control/api/services/usuario.service';
import { PersonalService } from '@control/api/services/personal.service';
import { ContactoService } from '@control/api/services/contacto.service';
import { UsuarioModel } from '../models/usuario.model';

@Injectable()
export class AuthService {
    constructor(private readonly usuarioService: UsuarioService,
                private readonly personalService: PersonalService,
                private readonly contactoService: ContactoService,
                private readonly jws: JwtService) {
    }

    public async iniciarSesion(autenticacionDto: AutenticacionDto): Promise<IUsuario> {
        const { usuario, clave } = autenticacionDto;
        const usuarioDB = await this.usuarioService.getUsuario(usuario);

        if(!usuarioDB || !(await usuarioDB.validaClave(clave))) {
            throw new HttpException({ mensaje: 'Usuario ó Clave incorrectos. Inténtalo nuevamente.'}, HttpStatus.UNAUTHORIZED);
        }

        const contacto = await this.contactoService.getContacto(usuarioDB.id);

        return {
            id: usuarioDB.id,
            usuario: usuarioDB.usuario,
            razonSocial: contacto.razonSocial,
            nombreComercial: contacto.nombreComercial,
            email: contacto.email,
            telfFijo: contacto.telfFijo,
            telfMovil: contacto.telfMovil,
            direccion: contacto.direccion,
            urbanizacion: contacto.urbanizacion,
            departamento: contacto.departamento,
            provincia: contacto.distrito,
            distrito: contacto.distrito,
            token: usuarioDB.token,
            perfil: contacto.personal.perfil.perfil,
            estado: usuarioDB.estado,
        } as IUsuario;
    }

    public async generarToken(payload: IUsuario): Promise<IAutenticacion> {
        const token = await this.jws.sign(payload);
        return {
            token,
        } as IAutenticacion;
    }

    public validaPayload(payload: IUsuario): Promise<UsuarioModel> {
        return this.usuarioService.getUsuario(payload.usuario);
    }
}
