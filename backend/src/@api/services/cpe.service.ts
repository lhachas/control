import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { AppConfig } from '@control/config/app.config';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import { ICPE } from '@control/api/interfaces/cpe.interface';
import { ConnectionWS,
    IXmlDocument,
    CDR,
    PDocument,
    SignatureConfig,
    RSign,
    RDocument,
} from '@fe/common';
import { DocumentoElectronico } from '@fe/common';
import { Serializer } from '@fe/utils';
import { WS } from '@fe/ws';
import { Signer } from '@fe/signed';
import { Documento as Datos } from '../../documento';

@Injectable()
export class CPEService implements ICPE {
    private _type?: IXmlDocument;
    private fileName?: string;
    private signer: Signer;
    private serializer: Serializer;
    private ws: WS;

    constructor(@Inject('APP.CONFIG') private readonly config: AppConfig) {
        this.fileName = '20553510661-01-F001-00000138';
        this.signer = new Signer();
        this.serializer = new Serializer();
        this.ws = new WS();
    }

    /**
     * @description
     * Tipo de documento a generar el [.xml]
     * @ejemplo
     * [Boleta][Factura][NotaCredito][NotaDebito][...]
     * @return [TipoDocumento]
     */
    get type(): IXmlDocument {
        return this._type;
    }

    set type(_type: IXmlDocument) {
        this._type = _type;
    }

    /**
     * @description credenciales para la [WS] de SUNAT
     */
    private async credentials(): Promise<void> {
        await this.ws.auth({
            ws: this.config.WSDemo,
            ruc: '20553510661',
            userSOL: 'MODDATOS',
            passwordSOL: 'moddatos',
            endPoint: '',
        } as ConnectionWS);
    }

    /**
     * @description Generar Documento [xml] en formato [string]
     * @param documentDto [DocumentoElectronico]
     * @return devuelve [Documento] en formato [XML][string]
     *
     */
    public async xmlGenerate(documentDto: DocumentoElectronico): Promise<RDocument> {
        try {
            const document = plainToClass(DocumentoElectronico, documentDto);
            const docStructure = this.type.generate(document);
            return this.serializer.xmlGenerate(docStructure);
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }

    /**
     *
     * @param xmlDocument [string]
     *
     */
    public async xmlSigned(xmlDocument: string): Promise<RSign> {
        try {
            this.signer.config = {
                openSSL: this.config.RutaOpenSSL,
                certificate: this.config.Certificado,
                certificatePassword: this.config.ClaveCertificado,
                xmlDocument,
            } as SignatureConfig;
            return await this.signer.xml();
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }

    /**
     * @description genera documento [.xml]
     * @param documentDto [DocumentoElectronico]
     * @return devuelve documento [.xml] comprimido en un [.zip], codificado en [base64]
     */
    public async xml(documentDto: DocumentoElectronico): Promise<string> {
        try {
            const document = plainToClass(DocumentoElectronico, documentDto);
            const xmlDocument = this.type.generate(document);
            const xml = this.serializer.xmlGenerate(xmlDocument);
            if (xml.success) {
                this.signer.config = {
                    openSSL: this.config.RutaOpenSSL,
                    certificate: this.config.Certificado,
                    certificatePassword: this.config.ClaveCertificado,
                    xmlDocument: xml.xmlDocument,
                } as SignatureConfig;
                const sign = await this.signer.xml();
                if (sign.success) {
                    const zip = await this.serializer.zipGenerate(sign.signedXmlDocument, document.fileName());
                    fs.writeFileSync(this.config.RutaXML.concat(document.fileName(), '.zip'), zip, 'base64');
                    return zip;
                }  else {
                    throw sign;
                }
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @description Enviar documento [.xml] generado y comprimido [.zip]
     * @param document [PDocument]
     * envio de documento [.zip] a la [W.S] de sunat
     * @return retorna el [CDR] con la repsuesta de [SUNAT]
     */
    public async send(document: PDocument): Promise<CDR> {
        try {
            await this.credentials();
            const responseWS = await this.ws.sendBill(document);
            if (responseWS.success) {
                const cdr =  await this.serializer.documentResponseGenerate(responseWS.constancyOfRecepty);
                fs.writeFileSync(`${this.config.RutaCDR}${cdr.fileName}.zip`, responseWS.constancyOfRecepty, { encoding: 'base64' });
                return cdr;
            } else {
                throw responseWS;
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.CONFLICT);
        }
    }
}
