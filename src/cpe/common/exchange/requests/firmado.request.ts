export class PFirmado {
    protected certificadoDigital?: string;
    protected claveCertificado?: string;
    protected tramaXmlSinFirma?: string;
    protected unSoloNodoExtension?: boolean;
    protected rutaOpenSSL?: string;

    get CertificadoDigital(): string {
        return this.certificadoDigital;
    }
    set CertificadoDigital(certificadoDigital: string) {
        this.certificadoDigital = certificadoDigital;
    }

    get ClaveCertificado(): string {
        return this.claveCertificado;
    }
    set ClaveCertificado(claveCertificado: string) {
        this.claveCertificado = claveCertificado;
    }

    get TramaXmlSinFirma(): string {
        return this.tramaXmlSinFirma;
    }
    set TramaXmlSinFirma(tramaXmlSinFirma: string) {
        this.tramaXmlSinFirma = tramaXmlSinFirma;
    }

    get UnSoloNodoExtension(): boolean {
        return this.unSoloNodoExtension;
    }
    set UnSoloNodoExtension(unSoloNodoExtension: boolean) {
        this.unSoloNodoExtension = unSoloNodoExtension;
    }

    get RutaOpenSSL(): string {
        return this.rutaOpenSSL;
    }
    set RutaOpenSSL(rutaOpenSSL: string) {
        this.rutaOpenSSL = rutaOpenSSL;
    }

    constructor() {
        this.UnSoloNodoExtension = true;
    }
}
