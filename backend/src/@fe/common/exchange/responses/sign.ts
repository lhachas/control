import { Comun } from './comun';

export class RSign extends Comun {
    protected _signedXmlDocument?: string;
    protected _signatureSummary?: string;
    protected _signatureValue?: string;

    get signedXmlDocument(): string {
        return this._signedXmlDocument;
    }
    set signedXmlDocument(_signedXmlDocument: string) {
        this._signedXmlDocument = _signedXmlDocument;
    }

    get signatureSummary(): string {
        return this._signatureSummary;
    }
    set signatureSummary(_signatureSummary: string) {
        this._signatureSummary = _signatureSummary;
    }

    get signatureValue(): string {
        return this._signatureValue;
    }
    set signatureValue(_signatureValue: string) {
        this._signatureValue = _signatureValue;
    }
}
