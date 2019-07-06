export class Utils {
    formatCert(certFile) {
        return certFile
            // remove BEGIN/END
            .replace(/-----(BEGIN|END)[\w\d\s]+-----/g, '')
            // remove \r, \n
            .replace(/[\r\n]/g, '');
    }

    krytoKey(certFile) {
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
}
