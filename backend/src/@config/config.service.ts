import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor() {
        const config = dotenv.parse(fs.readFileSync(`./.env`));
        this.envConfig = this.validateInput(config);
    }

    get isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }

    get RutaOpenSSL(): string {
        return String(this.envConfig.RUTA_OPENSSL);
    }

    get Certificado(): string {
        return String(this.envConfig.CERTIFICADO);
    }

    get ClaveCertificado(): string {
        return String(this.envConfig.CLAVE_CERTIFICADO);
    }

    get RutaXML(): string {
        return String(this.envConfig.RUTA_XML);
    }

    get RutaCDR(): string {
        return String(this.envConfig.RUTA_CDR);
    }

    get RutaDocs(): string {
        return String(this.envConfig.RutaDocs);
    }

    get RutaWS(): string {
        return String(this.envConfig.RUTA_WS);
    }

    get WSDemo(): string {
        return String(this.envConfig.WS_DEMO);
    }

    get WSProduccion(): string {
        return String(this.envConfig.WS_PRODUCCION);
    }

    get AutenticacionPrefix(): string {
        return String(this.envConfig.AUTENTICACION_PREFIX);
    }

    get TokenExpira(): string {
        return String(this.envConfig.TOKEN_EXPIRA);
    }

    get JwtClave(): string {
        return String(this.envConfig.JWT_CLAVE);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean(),
            RUTA_OPENSSL: Joi.string(),
            CERTIFICADO: Joi.string(),
            CLAVE_CERTIFICADO: Joi.string(),
            RUTA_XML:Joi.string(),
            RUTA_CDR: Joi.string(),
            RUTA_DOCS: Joi.string(),
            RUTA_WS: Joi.string(),
            WS_DEMO: Joi.string(),
            WS_PRODUCCION: Joi.string(),
            AUTENTICACION_PREFIX: Joi.string(),
            TOKEN_EXPIRA: Joi.string(),
            JWT_CLAVE: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Error de validación de configuración: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
