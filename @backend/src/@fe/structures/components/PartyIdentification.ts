import { XMLElement, XMLChild, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { PartyIdentificationId } from './PartyIdentificationId';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class PartyIdentification {
    @XMLChild({ namespace: CBC})
    public ID?: PartyIdentificationId;

    @XMLAttribute({namespace: CBC})
    public schemeID?: string;

    @XMLAttribute({namespace: CBC})
    public schemeName?: string;

    @XMLAttribute({namespace: CBC})
    public schemeAgencyName?: string;

    @XMLAttribute({namespace: CBC})
    public schemeURI?: string;

    constructor(pi: PartyIdentification) {
        this.ID = pi.ID;
    }
}
