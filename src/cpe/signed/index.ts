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
import { EspacioNombres, Utils, ICertificador, PFirmado, Firmado } from '@common';
import { Convert } from 'xml-core';

const crypto = new CryptoOSSL();

export class Certificador implements ICertificador {
    private utils: Utils;

    constructor() {
        this.utils = new Utils();
        Application.setEngine('OpenSSL', crypto);
    }
    
    public async FirmarXml(firma: PFirmado): Promise<Firmado> {
        const firmado = new  Firmado();
        try {
            pem.config({
                pathOpenSSL: firma.RutaOpenSSL,
            });
            
            if(!fs.existsSync(firma.CertificadoDigital)) {
                throw new Error('No Existe Certificado Digital.');
            }
            const certFile = fs.readFileSync(firma.CertificadoDigital);
            const xmlDoc = Parse(firma.DocumentoXml);
            
            const certificate = await pem.readPkcs12(certFile, { p12Password: firma.ClaveCertificado });
            const certificateInfo = await pem.readCertificateInfo(certificate.cert);

            const alg = {
                name: 'RSASSA-PKCS1-v1_5',
                hash: 'SHA-256',
            };      

            const x509Certificate = new X509Certificate(Buffer.from(this.utils.formatCert(certificate.cert), 'base64'));
                        
            const indiceNodo = firma.UnSoloNodoExtension ? 0 : 1;
            const nodoExtension = xmlDoc.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(indiceNodo);
            if (nodoExtension === null) throw new Error('No se pudo encontrar el nodo ExtensionContent en el XML'); 

            const key = await crypto.subtle.importKey('pkcs8', this.utils.krytoKey(certificate.key), alg, false, ['sign']);
            const signedXml = new SignedXml(xmlDoc);
            const xmlSignature = signedXml.XmlSignature;
            const signature =  await signedXml.Sign(alg, key , xmlDoc, {
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
            const x509Data = new KeyInfoX509Data(new Uint8Array(Buffer.from(this.utils.formatCert(certificate.cert), 'base64')));

            x509Data.AddSubjectName(x509Certificate.Subject);
            
            keyInfo.Add(x509Data);
            xmlSignature.KeyInfo = keyInfo;
            xmlSignature.Id = 'SignatureSP';
            
            const reference = new Reference('ds:SignedInfo');
            if (reference.DigestValue !== null) {
                xmlSignature.SignedInfo.References.Map((ref) => {
                    firmado.ResumenFirma = Convert.ToBase64(ref.DigestValue);
                });
                firmado.ValorFirma = Convert.ToBase64(signedXml.Signature);
            }

            nodoExtension.appendChild(signature.GetXml());
            firmado.Exito = true;
            firmado.DocumentoXmlFirmado = new XMLSerializer().serializeToString(xmlDoc);
            return firmado;
        } catch (e) {
            firmado.Exito = false;
            firmado.MensajeError = e;
            firmado.Origen = 'Firmado';
            throw firmado;
        }
    }
}
