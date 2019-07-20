import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { ExternalReference } from './ExternalReference';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class DigitalSignatureAttachment {
    private externalReference?: ExternalReference;

    @XMLChild({ namespace: CAC })
    get ExternalReference(): ExternalReference {
        return this.externalReference;
    }
    set ExternalReference(externalReference: ExternalReference) {
        this.externalReference = externalReference;
    }

    constructor(dsa: DigitalSignatureAttachment) {
        this.ExternalReference = dsa.ExternalReference;
    }
}
