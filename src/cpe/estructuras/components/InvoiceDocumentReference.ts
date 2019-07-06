import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class InvoiceDocumentReference {
    @XMLChild({ namespace: CBC })
    public ID?: string;

    @XMLChild({ namespace: CBC })
    public DocumentTypeCode?: string;

    constructor(idr: InvoiceDocumentReference) {
        this.ID = idr.ID;
        this.DocumentTypeCode = idr.DocumentTypeCode;
    }
}
