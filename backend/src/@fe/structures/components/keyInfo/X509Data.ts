import { XMLElement, XMLChild } from 'xml-serializer-ts';

// @XMLElement({ root: 'KeyInfo' })
export class X509Data {

    @XMLChild({ namespace: '' })
    public X509SubjectName: string;

    @XMLChild({ namespace: '' })
    public X509Certificate: string;

    constructor(x509Data: X509Data) {
        this.X509SubjectName = x509Data.X509SubjectName;
        this.X509Certificate = x509Data.X509Certificate;
    }
}
