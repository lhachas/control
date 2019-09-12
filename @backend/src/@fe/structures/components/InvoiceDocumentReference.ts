import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { DocumentTypeCode } from './DocumentTypeCode';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class InvoiceDocumentReference {
    @XMLChild({ namespace: CBC })
    public ID?: string;

    @XMLChild({ namespace: CBC })
    public DocumentTypeCode?: DocumentTypeCode;

    constructor(idr: InvoiceDocumentReference) {
        this.ID = idr.ID;
        this.DocumentTypeCode = idr.DocumentTypeCode;
    }
}
