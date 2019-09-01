import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const configDB: ConnectionOptions = {

    /**
     * @description
     * Tipo de base de datos. Debe especificar qué motor de base de datos utiliza.
     * Los valores posibles son:
     * @Ejemplo: [
     * "mysql",
     * "postgres",
     * "cockroachdb",
     * "mariadb",
     * "sqlite",
     * "cordova",
     * "nativescript",
     * "oracle",
     * "mssql",
     * "mongodb",
     * "sqljs",
     * "reaccion- nativo".]
     * Esta opción es obligatoria .
     */
    type: 'mysql',

    /**
     * @description
     * Host del servidor
     */
    host: 'localhost',

    /**
     * @description
     * Puerto de host de la base de datos. El puerto mysql predeterminado es 3306.
     */
    port: 3306,

    /**
     * @description
     * Nombre de usuario de la base de datos.
     */
    username: 'root',

    /**
     * @description
     * Contraseña de la base de datos.
     */
    password: '123456',

    /**
     * @description
     * Nombre de la base de datos.
     */
    database: 'controldb',

    /**
     * @description
     * El conjunto de caracteres para la conexión.
     * Esto se denomina "intercalación" en el nivel SQL de MySQL
     * (como utf8_general_ci). Si se especifica un conjunto
     * de caracteres de nivel SQL (como utf8mb4),
     * se utiliza la intercalación predeterminada para ese conjunto de caracteres.
     * (Predeterminado:) UTF8_GENERAL_CI.
     */
    charset: 'utf8_unicode_ci',

    /**
     * @description
     * la zona horaria configurada en el servidor MySQL.
     * Esto se utiliza para encasillar los valores de
     * fecha/hora del servidor en el objeto Fecha de
     * JavaScript y viceversa. Esto puede ser local,
     * Zo un desplazamiento en el formulario +HH:MMo -HH:MM.
     * (Por defecto: local)
     */
    timezone: 'local',

    /**
     * @description
     * Permitir conectarse a instancias de MySQL que soliciten
     * el antiguo método de autenticación [inseguro].
     * por defecto [false]
     */
    insecureAuth: true,

    /**
     * @description
     * Entidades a cargar y utilizar para esta conexión.
     * Acepta tanto las clases de entidad como las rutas
     * de directorios para cargar.
     * Los directorios soportan patrones globales.
     */
    entities: [join(__dirname, '../../@database/entities/*.entity{.ts,.js}')],

    /**
     * @description
     * Migraciones a cargar y utilizar para esta conexión.
     * Acepta tanto las clases de migración como los directorios para cargar.
     * Los directorios soportan patrones globales
     */
    migrations: [join(__dirname, '../../@database/migrations/*{.ts,.js}')],

    /**
     * @ADVERTENCIA
     * @description
     * Indica si el esquema de la base de datos debe crearse automáticamente
     * en cada inicio de la aplicación. Tenga cuidado con esta opción
     * y no la use en producción; de lo contrario,
     * puede perder datos de producción. Esta opción es útil durante
     * la depuración y el desarrollo. Como alternativa,
     * puede usar la CLI y ejecutar el comando schema: sync.
     * Tenga en cuenta que para la base de datos MongoDB no crea un esquema,
     * ya que MongoDB no tiene esquemas. En su lugar,
     * se sincroniza simplemente creando índices.
     */
    synchronize: false,

    /**
     * @description
     * Indica si las migraciones deben ejecutarse automáticamente
     * en cada inicio de aplicación. Como alternativa,
     * puede usar CLI y ejecutar la migración: ejecutar el comando.
     */
    migrationsRun: false,

    /**
     * @description
     * Indica si el registro está habilitado o no.
     * Si se configura en [true], la consulta y
     * el registro de errores estarán habilitados.
     * También puede especificar diferentes tipos de registro para habilitar,
     * @Ejemplo ["query", "error", "schema"]
     */
    logging: 'all',

    /**
     * @description
     * Registrador para ser utilizado para fines de registro.
     * Los valores posibles son:
     * "consola avanzada", "consola simple" y "archivo".
     * El valor predeterminado es "consola avanzada".
     * También puede especificar una clase de registrador que implementa
     * la Logger interfaz. Aprenda más sobre el registro .
     */
    logger: 'advanced-console',

    /**
     * @description
     *  Directorio donde las
     * [Entities] [Migrations] [subscribers]
     * deben ser creadas por defecto por CLI.
     */
    cli: {
        entitiesDir: 'src/@database/entities',
        migrationsDir: 'src/@database/migrations',
    },
};

export = configDB;
