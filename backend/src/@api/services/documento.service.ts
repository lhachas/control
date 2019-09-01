import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@control/config/config.service';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import { IDocumento } from '@control/api/interfaces/documento.interface';
import { ConexionWS,
    IDocumentoXml,
    CDR,
    PDocumento,
    ConfigFirma,
    RFirma,
    RDocumento,
} from '@fe/common';
import { DocumentoElectronico } from '@fe/common';
import { Serializador } from '@fe/utils';
import { WS } from '@fe/ws';
import {  Firmador } from '@fe/signed';
import { Documento as Datos } from '../../documento';

@Injectable()
export class DocumentoService implements IDocumento {
    private tipo?: IDocumentoXml;
    private nombreArchivo?: string;
    private firmador: Firmador;
    private serializador: Serializador;
    private ws: WS;

    constructor(private readonly config: ConfigService) {
        this.nombreArchivo = '20553510661-01-F001-00000138';
        this.firmador = new Firmador();
        this.serializador = new Serializador();
        this.ws = new WS();
    }

    /**
     * @description
     * Tipo de documento a generar el [.xml]
     * @ejemplo
     * [Boleta][Factura][NotaCredito][NotaDebito][...]
     * @return [TipoDocumento]
     */
    get Tipo(): IDocumentoXml {
        return this.tipo;
    }

    set Tipo(tipo: IDocumentoXml) {
        this.tipo = tipo;
    }

    /**
     * @description credenciales para la [WS] de SUNAT
     */
    private async Credenciales(): Promise<void> {
        await this.ws.Autenticacion({
            WS: this.config.WSDemo,
            RUC: '20553510661',
            UsuarioSOL: 'MODDATOS',
            ClaveSOL: 'moddatos',
            EndPoint: '',
        } as ConexionWS);
    }

    /**
     * @description Generar Documento [xml] en formato [string]
     * @param documentoDto [DocumentoElectronico]
     * @return devuelve [Documento] en formato [XML][string]
     *
     */
    public async GenerarXml(documentoDto: DocumentoElectronico): Promise<RDocumento> {
        try {
            const documento = plainToClass(DocumentoElectronico, documentoDto);
            const estructuraDoc = this.tipo.Generar(documento);
            return this.serializador.GenerarXml(estructuraDoc);
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }

    /**
     *
     * @param documentoXml [string]
     *
     */
    public async FirmarXml(documentoXml: string): Promise<RFirma> {
        try {
            this.firmador.Config = {
                RutaOpenSSL: this.config.RutaOpenSSL,
                CertificadoDigital: this.config.Certificado,
                ClaveCertificado: this.config.ClaveCertificado,
                DocumentoXml: documentoXml,
            } as ConfigFirma;
            return await this.firmador.xml();
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }

    /**
     * @description genera documento [.xml]
     * @param documentoDto [DocumentoElectronico]
     * @return devuelve documento [.xml] comprimido en un [.zip], codificado en [base64]
     */
    public async Xml(documentoDto: DocumentoElectronico): Promise<string> {
        try {
            const documento = plainToClass(DocumentoElectronico, documentoDto);
            const documentoXml = this.tipo.Generar(documento);
            const xml = this.serializador.GenerarXml(documentoXml);
            if (xml.Exito) {
                this.firmador.Config = {
                    RutaOpenSSL: this.config.RutaOpenSSL,
                    CertificadoDigital: this.config.Certificado,
                    ClaveCertificado: this.config.ClaveCertificado,
                    DocumentoXml: xml.DocumentoXml,
                } as ConfigFirma;
                const firma = await this.firmador.xml();
                if (firma.Exito) {
                    const zip = await this.serializador.GenerarZip(firma.DocumentoXmlFirmado, documento.NombreArchivo());
                    fs.writeFileSync(this.config.RutaXML.concat(documento.NombreArchivo(), '.zip'), zip, 'base64');
                    return zip;
                }  else {
                    throw firma;
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @description Enviar documento [.xml] generado y comprimido [.zip]
     * @param documento [PDocumento]
     * envio de documento [.zip] a la [W.S] de sunat
     * @return retorna el [CDR] con la repsuesta de [SUNAT]
     */
    public async Enviar(documento: PDocumento): Promise<CDR> {
        try {
            await this.Credenciales();
            const respuestaWS = await this.ws.EnviarDocumento(documento);
            if (respuestaWS.Exito) {
                const cdr =  await this.serializador.GenerarDocumentoRespuesta(respuestaWS.ConstanciaDeRecepcion);
                fs.writeFileSync(`${this.config.RutaCDR}${cdr.NombreArchivo}.zip`, respuestaWS.ConstanciaDeRecepcion, { encoding: 'base64' });
                return cdr;
            } else {
                throw respuestaWS;
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }
}
