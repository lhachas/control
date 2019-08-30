import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { PartyName } from './PartyName';
import { PostalAddress } from './PostalAddress';
import { PartyLegalEntity } from './PartyLegalEntity';
import { PartyIdentification } from './PartyIdentification';

const { CAC } = prefix;

@XMLElement({ root: CAC })
export class Party {

    @XMLChild({ namespace: CAC })
    public PartyIdentification?: PartyIdentification;

    @XMLChild({ namespace: CAC })
    public PartyName?: PartyName;

    @XMLChild({ namespace: CAC })
    public PostalAddress?: PostalAddress;

    @XMLChild({ namespace: CAC })
    public PartyLegalEntity?: PartyLegalEntity;

    constructor(party: Party) {
        this.PartyIdentification = party.PartyIdentification;
        this.PartyName = party.PartyName;
        this.PostalAddress = party.PostalAddress;
        this.PartyLegalEntity = party.PartyLegalEntity;
    }
}
