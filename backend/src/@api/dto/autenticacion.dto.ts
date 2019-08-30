import { IsNotEmpty, IsEmail, IsString, Length, MinLength } from 'class-validator';

export class AutenticacionDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4, {
        message: 'Tu nombre de usuario debe tener al menos 4 caracteres.',
    })
    readonly nombreUsuario: string;

    @Length(1, 8, {
        message: 'Su contraseña debe tener entre 1 y 8 caracteres.',
    })
    @IsString()
    @IsNotEmpty()
    readonly clave: string;

}
