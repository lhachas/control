export class FirmadoRequest {
    protected certificadoDigital?: string;
    protected passwordCertificado?: string;
    protected tramaXmlSinFirma?: string;
    protected unSoloNodoExtension?: boolean;

    get CertificadoDigital(): string {
        return this.certificadoDigital;
    }
    set CertificadoDigital(certificadoDigital: string) {
        this.certificadoDigital = certificadoDigital;
    }

    get PasswordCertificado(): string {
        return this.passwordCertificado;
    }
    set PasswordCertificado(passwordCertificado: string) {
        this.passwordCertificado = passwordCertificado;
    }

    get TramaXmlSinFirma(): string {
        // return new Buffer(this.tramaXmlSinFirma, 'base64').toString();
        return this.tramaXmlSinFirma;
    }
    set TramaXmlSinFirma(tramaXmlSinFirma: string) {
        // this.tramaXmlSinFirma = new Buffer(tramaXmlSinFirma).toString('base64');
        this.tramaXmlSinFirma = tramaXmlSinFirma;
    }

    get UnSoloNodoExtension(): boolean {
        return this.unSoloNodoExtension;
    }
    set UnSoloNodoExtension(unSoloNodoExtension: boolean) {
        this.unSoloNodoExtension = unSoloNodoExtension;
    }

    constructor() {
        this.UnSoloNodoExtension = true;
    }
}
