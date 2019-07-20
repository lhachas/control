import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@config';
import { IDocumento } from './documento.interface';
import * as fs from 'fs';
import { Documento as Datos } from '../../../documento';
import { 
    Certificador,
    Serializador,
    IDocumentoXml,
    CDR,
    WS,
    PDocumento,
    ConexionWS,
} from '@cpe';
import { Sunat, Contribuyente } from 'control-consultas-doc';

@Injectable()
export class Documento implements IDocumento {
    private tipoDocumento?: IDocumentoXml;
    private nombreArchivo?: string;
    private certificador: Certificador;
    private serializador: Serializador;
    private ws: WS;

    constructor(private readonly config: ConfigService) {
        this.nombreArchivo = '20553510661-01-F001-00000125';
        this.certificador = new Certificador();
        this.serializador = new Serializador();
        this.ws = new WS();
    }

    get TipoDocumento(): IDocumentoXml {
        return this.tipoDocumento;
    }
    
    set TipoDocumento(tipoDocumento: IDocumentoXml) {
        this.tipoDocumento = tipoDocumento;
    }
    
    private async Credenciales(): Promise<void> {
        await this.ws.Autenticacion({
            WS: this.config.WSDemo,
            RUC: '20553510661',
            UsuarioSOL: 'MODDATOS',
            ClaveSOL: 'moddatos',
            EndPoint: '',
        } as ConexionWS); 
    }

    public async getInfo(): Promise<Contribuyente> {
        const sunat = new Sunat();
        return await sunat.getInformacion('20131312955');
    }

    public async Xml(): Promise<string> {
        try {
            const documento = this.TipoDocumento.Generar(Datos);
            const xml = this.serializador.GenerarXml(documento);
            if (xml.Exito) {
                const firma = await this.certificador.FirmarXml({
                    RutaOpenSSL: this.config.RutaOpenSSL,
                    CertificadoDigital: this.config.Certificado,
                    ClaveCertificado: this.config.ClaveCertificado,
                    TramaXmlSinFirma: xml.TramaXmlSinFirma,
                    UnSoloNodoExtension: true,
                });
                if (firma.Exito) {
                    const zip = await this.serializador.GenerarZip(firma.DocumentoXmlFirmado, this.nombreArchivo);
                    fs.writeFileSync(this.config.RutaXML.concat(this.nombreArchivo, '.zip'), zip, 'base64');
                    return zip;
                }
            }
        } catch (e) {
            throw new HttpService();
        }
    }    

    public async Enviar(): Promise<CDR> {
        try {
            await this.Credenciales();
            const respuestaWS = await this.ws.EnviarDocumento({
                NombreArchivo: this.nombreArchivo,
                Zip: await this.Xml(),
            } as PDocumento);
            if (respuestaWS.Exito) {
                const cdr =  await this.serializador.GenerarDocumentoRespuesta(respuestaWS.ConstanciaDeRecepcion);
                fs.writeFileSync(`${this.config.RutaCDR}${cdr.NombreArchivo}.zip`, respuestaWS.ConstanciaDeRecepcion, { encoding: 'base64' });
                return cdr;
            } else {
                throw new Error(respuestaWS.MensajeError);
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }
}
