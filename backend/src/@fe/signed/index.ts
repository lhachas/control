import * as CryptoOSSL from 'node-webcrypto-ossl';
import * as pem from 'pem-promise';
import {
    Parse,
    SignedXml,
    Application,
    KeyInfo,
    KeyInfoX509Data,
    Reference,
    X509Certificate,
} from 'xmldsigjs';
import * as fs from 'fs';
import { ConfigFirma, RFirma } from '@fe/common/exchange';
import { EspacioNombres } from '@fe/common/constants';
import { IFirmador } from '@fe/common/interfaces';
import { Utils } from '@fe/utils';
import { Convert } from 'xml-core';
import { Certificate } from './certificate';
import { Algorithm } from './algorithm';

const crypto = new CryptoOSSL();

export class Firmador implements IFirmador {
    private utils: Utils;
    private algorithm: Algorithm;
    private config: ConfigFirma;

    constructor() {
        this.utils = new Utils();
        this.algorithm = new Algorithm();
        this.Config = new ConfigFirma();
        Application.setEngine('OpenSSL', crypto);
        this.algorithm.name = 'RSASSA-PKCS1-v1_5';
        this.algorithm.hash = 'SHA-256';
    }

    /**
     * @description Establecer paramentros de configuracion para posteriormente firmar el Xml
     * @public [ConfigFirma]
     * @class [ConfigFirma]
     *
     */
    public get Config(): ConfigFirma {
        return this.config;
    }

    /**
     * @description Establecer paramentros de configuracion para posteriormente firmar el Xml
     * @public [ConfigFirma]
     * @class [ConfigFirma]
     *
     */
    public set Config(config: ConfigFirma) {
        this.config = config;
    }

    private ConfigOpenSSL(): void {
        pem.config({
            pathOpenSSL: this.Config.RutaOpenSSL,
        });
    }

    /**
     * @description Lee Un certificado en formado [.PFX]
     * @param CertificadoDigital {string}
     * @return certificado {Certificate}
     *
     */
    private async getCertificado(): Promise<Certificate> {
        const certificado = fs.readFileSync(this.Config.CertificadoDigital);
        this.ConfigOpenSSL();
        return await pem.readPkcs12(certificado, { p12Password: this.Config.ClaveCertificado });
    }

    /**
     * @description Obtiene La clave del certificado en formato [CryptoKey]
     * @param Certificado {Certificate}
     * @return clave certificado {CryptoKey}
     *
     */
    private async getClaveCertificado(): Promise<CryptoKey> {
        const { key } = await this.getCertificado();
        return await crypto.subtle.importKey('pkcs8', this.utils.crytoKey(key), this.algorithm, false, ['sign']);
    }

    /**
     * @description Obtiene el cuerpo del certificado
     * @param Certificado {Certificate}
     * @return cuerpo del certificado {Body}
     *
     */
    private async getDetalleCertificado(): Promise<string> {
        const { cert } = await this.getCertificado();
        return this.utils.formatCert(cert);
    }

    private get DocumentoXml(): Document {
        return Parse(this.Config.DocumentoXml);
    }

    /**
     * @description Obtiene el nodo [ExtensionContent] del Documento Xml
     * @description para posteriormente agregar la Firma
     * @return ExtensionContent {Element}
     */
    private get NodoFirma(): Element {
        return this.DocumentoXml.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(0);
    }

    /**
     * @description Firma el documento Xml
     * @ejemplo [Factura][Boleta][NotaCredito][NotaDebito]
     * @return XmlFirmado {RFirma}
     */
    public async Xml(): Promise<RFirma> {
        const firma = new  RFirma();
        try {
            if(!fs.existsSync(this.Config.CertificadoDigital)) throw new Error('No Existe Certificado Digital.');
            if(this.NodoFirma === null) throw new Error('No se pudo encontrar el nodo ExtensionContent en el XML');
            if(!this.config.DocumentoXml) throw new Error('Documento XML esta vació');
            const documentoXml = Parse(this.Config.DocumentoXml);
            const nodoFirma = documentoXml.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(0);
            const x509Certificate = new X509Certificate(Buffer.from(await this.getDetalleCertificado(), 'base64'));
            const signedXml = new SignedXml(documentoXml);
            const xmlSignature = signedXml.XmlSignature;
            const signature =  await signedXml.Sign(this.algorithm, await this.getClaveCertificado(), documentoXml, {
                id: 'SINGATURE',
                references: [
                    {
                        hash: 'SHA-256',
                        uri: '',
                        transforms: ['enveloped'],
                    },
                ],
            });

            const keyInfo = new KeyInfo();
            const x509Data = new KeyInfoX509Data(new Uint8Array(Buffer.from(await this.getDetalleCertificado(), 'base64')));

            x509Data.AddSubjectName(x509Certificate.Subject);
            keyInfo.Add(x509Data);
            xmlSignature.KeyInfo = keyInfo;
            xmlSignature.Id = 'SignatureSP';

            const reference = new Reference('ds:SignedInfo');
            if (reference.DigestValue !== null) {
                xmlSignature.SignedInfo.References.Map((ref) => {
                    firma.ResumenFirma = Convert.ToBase64(ref.DigestValue);
                });
                firma.ValorFirma = Convert.ToBase64(signedXml.Signature);
            }
            nodoFirma.appendChild(signature.GetXml());
            firma.DocumentoXmlFirmado = new XMLSerializer().serializeToString(documentoXml);
            firma.Exito = true;
            return firma;
        } catch (e) {
            firma.Exito = false;
            firma.MensajeError = e;
            firma.Origen = 'firma';
            throw firma;
        }
    }
}
