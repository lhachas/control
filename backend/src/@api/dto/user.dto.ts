import { IsNotEmpty, IsNumber, IsEmail, IsString, Length, MinLength } from 'class-validator';

export class UsuarioDto {

    @IsNumber()
    public idPersonal: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(4, {
        message: 'Tu nombre de usuario debe tener al menos 4 caracteres.',
    })
    readonly usuario?: string;

    @Length(1, 8, {
        message: 'Su contraseña debe tener entre 1 y 8 caracteres.',
    })
    @IsString()
    @IsNotEmpty()
    readonly clave?: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly rol?: string;
}
