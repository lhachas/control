// import * as fs from 'fs';
// import * as path from 'path';
// import { Crypto } from '@peculiar/webcrypto';
// // import * as CryptoOSSL from 'node-webcrypto-ossl';
// import * as xade from 'xadesjs';
// import { FirmadoRequest, FirmadoResponse } from '@comun';

// // const crypto = new CryptoOSSL();
// const crypto = new Crypto();
// xade.Application.setEngine('NodeJS', crypto);

// export class Certificador {
//     preparePem(pem) {
//         return pem
//             // remove BEGIN/END
//             .replace(/-----(BEGIN|END)[\w\d\s]+-----/g, '')
//             // remove \r, \n
//             .replace(/[\r\n]/g, '');
//     }
    
//     pem2der(pem) {
//         pem = this.preparePem(pem);
//         // convert base64 to ArrayBuffer
//         return new Uint8Array(Buffer.from(pem, 'base64')).buffer;
//     }

// // tslint:disable-next-line: no-shadowed-variable
//     public async FirmarXml(request: FirmadoRequest): Promise<FirmadoResponse> {
//         const respuesta = new   FirmadoResponse();
//         const hash = 'SHA-256';
//         const alg = {
//             name: 'RSASSA-PKCS1-v1_5',
//             hash,
//         };

//         const certPem = fs.readFileSync(path.join(__dirname, '../certificados/LLama_body.pem'), { encoding: 'utf8' });
//         const keyPem = fs.readFileSync(path.join(__dirname, '../certificados/LlamaPk8.pem'), { encoding: 'utf8' });

//         const certDer = this.pem2der(certPem);
//         const keyDer = this.pem2der(keyPem);
//         console.log(keyDer);
        
//         const key = await crypto.subtle.importKey('pkcs8', keyDer, alg, false, ['sign']);
//         // const keys = await crypto.subtle.generateKey(alg, false, ['sign', 'verify']);
        
//         console.log(key);

//         const xml = xade.Parse(request.TramaXmlSinFirma);
//         const xadesXml = new xade.SignedXml();
//         // const x509 = this.preparePem(certPem);
//         const signature = await xadesXml.Sign(alg, key, xml, {
//             x509: [ this.preparePem(certPem)],
//         });
//         fs.writeFileSync('signed.xml', signature.GetXml());
//         return respuesta;
//     }
// }
