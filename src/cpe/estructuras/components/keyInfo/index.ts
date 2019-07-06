import * as jsontoxml from 'jsontoxml';
import * as forge from 'node-forge';
import { KeyInfo as MyKeyInfo } from './KeyInfo';
import { X509Data } from './X509Data';

export class KeyInfo {
    certificate: any;
    constructor(certificate: any) {
        if(Buffer.isBuffer(certificate)) {
            certificate = certificate.toString('ascii');
        }
        if(certificate == null || typeof certificate !== 'string') {
            throw new Error('CertificatePEM debe ser un certificado válido en formato PEM');
        }
        this.certificate = certificate;
    }

    getSubjectName(certObj) {
        let subjectFields: string[] = [];
        const fields: string[] = ['CN', 'OU', 'O', 'L', 'ST', 'C'];
      
        if (certObj.subject) {
          subjectFields = fields.reduce((subjects, fieldName) => {
            const certAttr = certObj.subject.getField(fieldName);
      
            if (certAttr) {
                subjects.push(`${fieldName}=${certAttr.value}`);
            }
      
            return subjects;
          }, []);
        }
      
        return Array.isArray(subjectFields) ? subjectFields.join(',') : '';
    }

    getKeyInfo(key, prefix) {
        const certBodyInB64 = forge.util.encode64(forge.pem.decode(this.certificate)[0].body);
        const certObj = forge.pki.certificateFromPem(this.certificate);
        prefix = prefix || '';
        const keyInfo = new MyKeyInfo({
            X509Data: new X509Data({
                X509SubjectName: this.getSubjectName(certObj),
                X509Certificate: certBodyInB64,
            }),
        });
        return jsontoxml(keyInfo).toString();
    }

    getKey() {
        return this.certificate;
    }
}
