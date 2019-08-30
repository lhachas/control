import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { InvoiceDocumentReference } from './InvoiceDocumentReference';

const { CAC } = prefix;

@XMLElement({ root: CAC })
export class BillingReference {
    private invoiceDocumentReference?: InvoiceDocumentReference;

    @XMLChild({ namespace: CAC })
    get InvoiceDocumentReference(): InvoiceDocumentReference {
        return this.invoiceDocumentReference;
    }
    set InvoiceDocumentReference(invoiceDocumentReference: InvoiceDocumentReference) {
        this.invoiceDocumentReference = invoiceDocumentReference;
    }

    constructor(idr: InvoiceDocumentReference) {
        this.invoiceDocumentReference = idr;
    }
}
