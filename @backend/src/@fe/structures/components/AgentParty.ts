import { PartyIdentification } from './PartyIdentification';
import { PartyName } from './PartyName';
import { PostalAddress } from './PostalAddress';
import { PartyLegalEntity } from './PartyLegalEntity';

export class AgentParty {
    private partyIdentification?: PartyIdentification;
    private partyName?: PartyName;
    private postalAddress?: PostalAddress;
    private partyLegalEntity?: PartyLegalEntity;
    
    get PartyIdentification(): PartyIdentification {
        return this.partyIdentification;
    }
    set PartyIdentification(partyIdentification: PartyIdentification) {
        this.partyIdentification = partyIdentification;
    }

    get PartyName(): PartyName {
        return this.partyName;
    }
    set PartyName(partyName: PartyName) {
        this.partyName = partyName;
    }

    get PostalAddress(): PostalAddress {
        return this.postalAddress;
    }
    set PostalAddress(postalAddress: PostalAddress) {
        this.postalAddress = postalAddress;
    }

    get PartyLegalEntity(): PartyLegalEntity {
        return this.partyLegalEntity;
    }
    set PartyLegalEntity(partyLegalEntity: PartyLegalEntity) {
        this.partyLegalEntity = partyLegalEntity;
    }
}
