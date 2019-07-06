// // import { SignedXml, xpath as select, FileKeyInfo } from 'xml-crypto';
// import { DOMParser } from 'xmldom';
// import * as xmldsig from 'xmldsigjs';
// import * as pem from 'pem';
// import * as asn1js from 'asn1js';
// import * as pkijs from 'pkijs';
// import * as xades from 'xadesjs';
// import * as CryptoOSSL from 'node-webcrypto-ossl';
// import * as fs from 'fs';
// import * as path from 'path';
// import { FirmadoRequest, FirmadoResponse } from '@comun';
// import { KeyInfo } from '@estructuras';

// const crypto = new CryptoOSSL();

// interface IKeys {
//     privateKey: string;
//     publicKey: string;
//     [key: string]: string;
// }

// export class CertificadorEs {
//     // public ValidarFirmaXml(xml, certFile): FirmadoResponse {
//     //     const respuesta = new FirmadoResponse();
//     //     try {
//     //         const doc = new DOMParser().parseFromString(xml);
//     //         const signatureElement = select(doc, '/*/*/*/*/*[local-name(.)="signature"]')[0];
//     //         const signature = new SignedXml();
//     //         signature.keyInfoProvider = new FileKeyInfo(certFile);
//     //         signature.loadSignature(signatureElement);
//     //     } catch (e) {
//     //         xmldsigjs.sig
//     //     }
//     //     return respuesta;
//     // }

//     async CreateCertificate(commonName, keys, alg) {
//         // Generate new certificate
//         const certificate = new pkijs.Certificate();
    
//         certificate.version = 2;
//         certificate.serialNumber = new asn1js.Integer({ value: 1 });
//         certificate.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
//             type: '2.5.4.6', // Country name
//             value: new asn1js.PrintableString({ value: 'EN' }),
//         }));
//         certificate.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
//             type: '2.5.4.3', // Common name
//             value: new asn1js.BmpString({ value: commonName }),
//         }));
//         certificate.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
//             type: '2.5.4.6', // Country name
//             value: new asn1js.PrintableString({ value: 'EN' }),
//         }));
//         certificate.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
//             type: '2.5.4.3', // Common name
//             value: new asn1js.BmpString({ value: commonName }),
//         }));
    
//         certificate.notBefore.value = new Date();
//         certificate.notAfter.value = new Date();
//         certificate.notAfter.value.setFullYear(certificate.notAfter.value.getFullYear() + 1);
    
//         certificate.extensions = []; // Extensions are not a part of certificate by default, it's an optional array
//         await certificate.subjectPublicKeyInfo.importKey(keys.publicKey);
//         await certificate.sign(keys.privateKey, alg.hash.name);
    
//         // Convert certificate to DER
//         const derCert = certificate.toSchema(true).toBER(false);
//         // const pem = DerToPem(derCert, "CERTIFICATE");
//         const pem = Buffer.from(derCert).toString('base64');
//         // console.log(pem);
//         // import key to crypto
//         return pem;
//     }
    
//     async GenerateKeys(alg) {
//         return await crypto.subtle.generateKey(alg, false, ['sign', 'verify']);
//     }
    
//     async main(request: FirmadoRequest) {
//         const certFile = fs.readFileSync(path.join(__dirname, '../certificados/LLAMA-PE-CERTIFICADO-DEMO-20553510661.pfx'));
//         pem.config({
//             pathOpenSSL: 'C:/Program Files/OpenSSL-Win64/bin/openssl.exe',
//         });
//         pem.readPkcs12(certFile, { p12Password: '123456LLAMA' }, (err: any, cert: any) => {
//             console.log(cert);
            
//         });

//         const commonName = 'Test self-signed certificate';
//         const alg = {
//             name: 'RSASSA-PKCS1-v1_5',
//             hash: { name: 'SHA-256' },
//             publicExponent: new Uint8Array([1, 0, 1]),
//             modulusLength: 2048,
//         };
//         // set crypto engine
//         xades.Application.setEngine('OpenSSL', crypto);
//         pkijs.setEngine('OpenSSL', crypto, new pkijs.CryptoEngine({ name: 'OpenSSL', crypto, subtle: crypto.subtle }));
       
//         const keys = await this.GenerateKeys(alg);
//         // console.log(keys.privateKey);
        
//         const cert = await this.CreateCertificate(commonName, keys, alg);
    
//         const xmlDoc = xades.Parse(request.TramaXmlSinFirma);
//         const xml = new xades.SignedXml(xmlDoc);
    
//         // If you need custom data you can add it manually
//         xml.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.SignaturePolicyId.SigPolicyId.Identifier.Qualifier = 'OIDAsURI';
//         xml.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.SignaturePolicyId.SigPolicyId.Identifier.Value = 'my.uti.oid';
//         xml.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.SignaturePolicyId.SigPolicyHash.DigestMethod.Algorithm = 'SHA-1';
//         xml.SignedProperties.SignedSignatureProperties.SignaturePolicyIdentifier.SignaturePolicyId.SigPolicyHash.DigestValue = new Uint8Array(20);
    
// // tslint:disable-next-line: no-string-literal
//         // console.log(keys['privateKey']);
//         const keyFile = fs.readFileSync(path.join(__dirname, '../certificados/LLama.key'));
//         const keyDer = new Uint8Array(Buffer.from(keyFile.toString(), 'base64')).buffer;
//         const signedXml = await xml.Sign(               // Signing document 
//             alg,                              // algorithm  
// // tslint:disable-next-line: no-string-literal
//             keys['privateKey'],                        // key  
//             xmlDoc,                                 // document 
//             {               
//                                         // options 
// // tslint:disable-next-line: no-string-literal
//                 keyValue: keys['publicKey'],
//                 x509: [cert],
//                 signingCertificate: cert,
//                 references: [
//                     { hash: 'SHA-256', transforms: ['enveloped'] },
//                 ],
//                 productionPlace: {
//                     country: 'Country',
//                     state: 'State',
//                     city: 'City',
//                     code: 'Code',
//                 },
//                 signerRole: {
//                     claimed: ['Some role'],
//                 },
//             },
//         );
    
//         fs.writeFileSync('signed.xml', signedXml.GetXml());
//         // console.log(signedXml.toString());
//     }
//     // public FirmarXml(request: FirmadoRequest): FirmadoResponse {
//     //     const respuesta = new FirmadoResponse();
//     //     try {
//     //         const keyFile = fs.readFileSync(path.join(__dirname, '../certificados/LLama.key'));
//     //         const certFile = fs.readFileSync(path.join(__dirname, '../certificados/LLAMA.pem'));
//     //         const signature = new SignedXml();
//     //         signature.keyInfoProvider = new KeyInfo(certFile);
//     //         signature.signingKey = keyFile;
//     //         signature.addReference('//*[local-name(.)="ExtensionContent"]');
//     //         signature.computeSignature(request.TramaXmlSinFirma, {
//     //             prefix: 'ds',
//     //             location: { 
//     //                 reference: '//*[local-name(.)="ExtensionContent"]', 
//     //                 action: 'append' ,
//     //             },
//     //         });
//     //         fs.writeFileSync('signed.xml', signature.getSignedXml());
//     //         respuesta.Exito = true;
//     //         return respuesta;
//     //     } catch (e) {
//     //         respuesta.Exito = false;
//     //         respuesta.MensajeError = e;
//     //         throw e;
//     //     }
//     // }
// }
