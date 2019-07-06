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

    get RutaCertificado(): string {
        return String(path.join(__dirname, `../cpe/certificados/${this.envConfig.CERTIFICADO}`));
    }

    get ClaveCertificado(): string {
        return String(this.envConfig.CLAVE_CERTIFICADO);
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
