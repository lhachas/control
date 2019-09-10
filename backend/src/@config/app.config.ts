import * as _ from 'lodash';
import { join } from 'path';

const App = {
    /**
     * Puerto
     */
    Puerto: 3000,

    /**
     * @Firma
     */
    RutaOpenSSL: 'C:/Program Files/OpenSSL-Win64/bin/openssl.exe',

    /**
     * @Certificado
     */
    Certificado: join(process.env.PWD, '/certificates/LLAMA-PE-CERTIFICADO-DEMO-20553510661.pfx'),
    ClaveCertificado: '123456LLAMA',

    /**
     * @SUNAT
     */
    RutaXML: join(process.env.PWD, '/files/xml/'),
    RutaCDR: join(process.env.PWD, '/files/cdr/'),
    RutaDocs: join(process.env.PWD, '/docs/'),

    /**
     * @WEBServices
     */
    RutaWS: join(process.env.PWD, '/wsdl/demo_nubefact.wsdl'),
    WSDemo: 'https://demo-ose.nubefact.com/ol-ti-itcpe/billService?wsdl',
    WSProduccion: 'https://ose.nubefact.com/ol-ti-itcpe/billService?wsdl',

    /**
     * @JWT
     */
    JWT: {
        Expiracion: '7 days',
        Clave: 'leonelhs',
    },
};

export type AppConfig = typeof App;
export const AppConfig: AppConfig = _.merge(App);
