import * as xmlCore from 'xml-core';
import * as jszip from 'jszip';
import { CDR, ErrorWS } from '@fe/common/exchange';

export class Utils {

    processed(code: string): boolean {
        let status: boolean = true;
        if(code === '0' || code === '99') {
            status = true;
        } else if(code === '98') {
            status = false;
        }
        return status;
    }

    getResponseCDR(doc: string): CDR {
        const cdr = new CDR();

        const xmlDoc = xmlCore.Parse(doc);
        const applicationResponse = xmlDoc.getElementsByTagName('ar:ApplicationResponse').item(0);
        const response = applicationResponse
                            .getElementsByTagName('cac:DocumentResponse').item(0)
                            .getElementsByTagName('cac:Response');

        cdr.date = applicationResponse.getElementsByTagName('cbc:ResponseDate').item(0).textContent;
        cdr.time = applicationResponse.getElementsByTagName('cbc:ResponseTime').item(0).textContent;

        for (let i = 0; i < response.length; i++) {
            cdr.code = response[i].getElementsByTagName('cbc:ResponseCode').item(0).textContent;
            cdr.description = response[i].getElementsByTagName('cbc:Description').item(0).textContent;
            const status = response[i].getElementsByTagName('cac:Status');
            if (status.length > 0) {
                for (let e = 0; e < status.length; e++) {
                    cdr.status.push({
                        code: status[e].getElementsByTagName('cbc:StatusReasonCode').item(0).textContent,
                        reason: status[e].getElementsByTagName('cbc:StatusReason').item(0).textContent,
                    });
                }
            }
        }
        return cdr;
    }

    formatCert(certFile) {
        return certFile
            // remove BEGIN/END
            .replace(/-----(BEGIN|END)[\w\d\s]+-----/g, '')
            // remove \r, \n
            .replace(/[\r\n]/g, '');
    }

    crytoKey(certFile) {
        certFile = this.formatCert(certFile);
        // convert base64 to ArrayBuffer
        return new Uint8Array(Buffer.from(certFile, 'base64')).buffer;
    }

    b64ToBinary(base64) {
        const raw = atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));

        for(let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    errorWS(error: any): ErrorWS {
        const { root: { Envelope: { Body: { Fault } } } } = error;
        return {
            code: Fault.detail ? Fault.faultstring : Fault.faultcode,
            description: Fault.detail ? Fault.detail.message : Fault.faultstring,
        } as ErrorWS;
    }
}
