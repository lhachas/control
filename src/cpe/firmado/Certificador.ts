import { Injectable } from '@nestjs/common';
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
import { FirmadoRequest, FirmadoResponse } from '@comun';
import { EspacioNombres, Utils, ICertificador } from '@comun';
import { ConfigService } from '@config';
import { Convert } from 'xml-core';

const crypto = new CryptoOSSL();

@Injectable()
export class Certificador implements ICertificador {
    constructor(private readonly config: ConfigService) {
        Application.setEngine('OpenSSL', crypto);
        pem.config({
            pathOpenSSL: this.config.RutaOpenSSL,
        });
    }

    public async FirmarXml(request: FirmadoRequest): Promise<FirmadoResponse> {
        const respuesta = new   FirmadoResponse();
        const utils = new Utils();
        try {
            const certFile = fs.readFileSync(this.config.RutaCertificado);
            const xmlDoc = Parse(request.TramaXmlSinFirma);
            
            const certificate = await pem.readPkcs12(certFile, { p12Password: this.config.ClaveCertificado });
            const certificateInfo = await pem.readCertificateInfo(certificate.cert);
            const hash = 'SHA-256';
            const alg = {
                name: 'RSASSA-PKCS1-v1_5',
                hash,
            };      

            const x509Certificate = new X509Certificate(Buffer.from(utils.formatCert(certificate.cert), 'base64'));
                        
            const indiceNodo = request.UnSoloNodoExtension ? 0 : 1;
            const nodoExtension = xmlDoc.getElementsByTagNameNS(EspacioNombres.ext, 'ExtensionContent').item(indiceNodo);
            if (nodoExtension === null) throw new Error('No se pudo encontrar el nodo ExtensionContent en el XML'); 

            const key = await crypto.subtle.importKey('pkcs8', utils.krytoKey(certificate.key), alg, false, ['sign']);
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
            const x509Data = new KeyInfoX509Data(new Uint8Array(Buffer.from(utils.formatCert(certificate.cert), 'base64')));

            x509Data.AddSubjectName(x509Certificate.Subject);
            
            keyInfo.Add(x509Data);
            xmlSignature.KeyInfo = keyInfo;
            xmlSignature.Id = 'SignatureSP';
            
            const reference = new Reference('ds:SignedInfo');
            if (reference.DigestValue !== null) {
                xmlSignature.SignedInfo.References.Map((ref) => {
                    respuesta.ResumenFirma = Convert.ToBase64(ref.DigestValue);
                });
                respuesta.ValorFirma = Convert.ToBase64(signedXml.Signature);
            }

            nodoExtension.appendChild(signature.GetXml());
            respuesta.Exito = true;
            respuesta.TramaXmlFirmado = new XMLSerializer().serializeToString(xmlDoc);
            return respuesta;
        } catch (e) {
            respuesta.Exito = false;
            respuesta.MensajeError = e;
            throw respuesta;
        }
    }
}
