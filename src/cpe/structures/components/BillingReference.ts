import { XMLElement, XMLChild, xmlChild } from 'xml-serializer-ts';
import { prefix } from '@common';
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
