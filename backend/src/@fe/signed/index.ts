import * as CryptoOSSL from 'node-webcrypto-ossl';
import * as pem from 'pem-promise';
import * as fs from 'fs';
import {
    Parse,
    SignedXml,
    Application,
    KeyInfo,
    KeyInfoX509Data,
    Reference,
    X509Certificate,
} from 'xmldsigjs';
import { SignatureConfig, RSign } from '@fe/common/exchange';
import { EspacioNombres } from '@fe/common/constants';
import { ISigner } from '@fe/common/interfaces';
import { Utils } from '@fe/utils';
import { Convert } from 'xml-core';
import { Certificate } from './certificate';
import { Algorithm } from './algorithm';

const crypto = new CryptoOSSL();

export class Signer implements ISigner {
    private _utils: Utils;
    private _algorithm: Algorithm;
    private _config: SignatureConfig;

    constructor() {
        this._utils = new Utils();
        this._algorithm = new Algorithm();
        this._config = new SignatureConfig();
        Application.setEngine('OpenSSL', crypto);
        this._algorithm.name = 'RSASSA-PKCS1-v1_5';
        this._algorithm.hash = 'SHA-256';
    }

    /**
     * @description Establecer paramentros de configuracion para posteriormente firmar el Xml
     * @public [ConfigFirma]
     * @class [ConfigFirma]
     *
     */
    public get config(): SignatureConfig {
        return this._config;
    }

    /**
     * @description Establecer paramentros de configuracion para posteriormente firmar el Xml
     * @public [ConfigFirma]
     * @class [ConfigFirma]
     *
     */
    public set config(_config: SignatureConfig) {
        this._config = _config;
    }

    private configOpenSSL(): void {
        pem.config({
            pathOpenSSL: this.config.openSSL,
        });
    }

    /**
     * @description Lee Un certificado en formado [.PFX]
     * @param certificate {string}
     * @return certificado {Certificate}
     *
     */
    private async getCertificate(): Promise<Certificate> {
        const certificado = fs.readFileSync(this.config.certificate);
        this.configOpenSSL();
        return await pem.readPkcs12(certificado, { p12Password: this.config.certificate });
    }

    /**
     * @description Obtiene La clave del certificado en formato [CryptoKey]
     * @param Certificado {Certificate}
     * @return clave certificado {CryptoKey}
     *
     */
    private async getCertificatePassword(): Promise<CryptoKey> {
        const { key } = await this.getCertificate();
        return await crypto.subtle.importKey('pkcs8', this._utils.crytoKey(key), this._algorithm, false, ['sign']);
    }

    /**
     * @description Obtiene el cuerpo del certificado
     * @param Certificado {Certificate}
     * @return cuerpo del certificado {Body}
     *
     */
    private async getCertificateDetail(): Promise<string> {
        const { cert } = await this.getCertificate();
        return this._utils.formatCert(cert);
    }

    private get xmlDocument(): Document {
        return Parse(this.config.xmlDocument);
    }

    /**
     * @description Obtiene el nodo [ExtensionContent] del Documento Xml
     * @description para posteriormente agregar la Firma
     * @return ExtensionContent {Element}
     */
    private get signNode(): Element {
        return this.xmlDocument.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(0);
    }

    /**
     * @description Firma el documento Xml
     * @ejemplo [Factura][Boleta][NotaCredito][NotaDebito]
     * @return XmlFirmado {RFirma}
     */
    public async xml(): Promise<RSign> {
        const sign = new  RSign();
        try {
            if(!fs.existsSync(this.config.certificate)) throw new Error('No Existe Certificado Digital.');
            if(this.signNode === null) throw new Error('No se pudo encontrar el nodo ExtensionContent en el XML');
            if(!this.config.xmlDocument) throw new Error('Documento XML esta vació');
            const documentoXml = Parse(this.config.xmlDocument);
            const nodoFirma = documentoXml.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(0);
            const x509Certificate = new X509Certificate(Buffer.from(await this.getCertificateDetail(), 'base64'));
            const signedXml = new SignedXml(documentoXml);
            const xmlSignature = signedXml.XmlSignature;
            const signature =  await signedXml.Sign(this._algorithm, await this.getCertificatePassword(), documentoXml, {
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
            const x509Data = new KeyInfoX509Data(new Uint8Array(Buffer.from(await this.getCertificateDetail(), 'base64')));

            x509Data.AddSubjectName(x509Certificate.Subject);
            keyInfo.Add(x509Data);
            xmlSignature.KeyInfo = keyInfo;
            xmlSignature.Id = 'SignatureSP';

            const reference = new Reference('ds:SignedInfo');
            if (reference.DigestValue !== null) {
                xmlSignature.SignedInfo.References.Map((ref) => {
                    sign.signatureSummary = Convert.ToBase64(ref.DigestValue);
                });
                sign.signatureValue = Convert.ToBase64(signedXml.Signature);
            }
            nodoFirma.appendChild(signature.GetXml());
            sign.signedXmlDocument = new XMLSerializer().serializeToString(documentoXml);
            sign.success = true;
            return sign;
        } catch (e) {
            sign.success = false;
            sign.message = e;
            sign.origin = 'firma';
            throw sign;
        }
    }
}
