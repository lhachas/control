import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { PartyIdentification } from './PartyIdentification';
import { PartyName } from './PartyName';

const { CAC } = prefix;

@XMLElement({ root: CAC })
export class SignatoryParty {
    private partyIdentification?: PartyIdentification;
    private partyName?: PartyName;

    @XMLChild({ namespace: CAC })
    get PartyIdentification(): PartyIdentification {
        return this.partyIdentification;
    }
    set PartyIdentification(partyIdentification: PartyIdentification) {
        this.partyIdentification = partyIdentification;
    }

    @XMLChild({ namespace: CAC })
    get PartyName(): PartyName {
        return this.partyName;
    }
    set PartyName(partyName: PartyName) {
        this.partyName = partyName;
    }

    constructor(sp: SignatoryParty) {
        this.PartyIdentification = sp.PartyIdentification;
        this.PartyName = sp.PartyName;
    }
}
