import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { SignatoryParty } from './SignatoryParty';
import { DigitalSignatureAttachment } from './DigitalSignatureAttachment';
import { PartyIdentification } from './PartyIdentification';
import { PartyName } from './PartyName';
import { ExternalReference } from './ExternalReference';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class SignatureCac {
    private id?: string;
    private signatoryParty?: SignatoryParty;
    private digitalSignatureAttachment?: DigitalSignatureAttachment;

    @XMLChild({ namespace: CBC })
    get ID(): string {
        return this.id;
    }
    set ID(id: string) {
        this.id = id;
    }

    @XMLChild({ namespace: CAC })
    get SignatoryParty(): SignatoryParty {
        return this.signatoryParty;
    }
    set SignatoryParty(signatoryParty: SignatoryParty) {
        this.signatoryParty = signatoryParty;
    }

    @XMLChild({ namespace: CAC })
    get DigitalSignatureAttachment(): DigitalSignatureAttachment {
        return this.digitalSignatureAttachment;
    }
    set DigitalSignatureAttachment(digitalSignatureAttachment: DigitalSignatureAttachment) {
        this.digitalSignatureAttachment = digitalSignatureAttachment;
    }
    constructor(sc: SignatureCac) {
        this.ID = sc.ID;
        this.SignatoryParty = sc.SignatoryParty;
        this.DigitalSignatureAttachment = sc.DigitalSignatureAttachment;
    }
}
