import { XMLChild, XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CAC } = prefix;

@XMLElement({ root: CAC })
export class PartyIdentificationId {
    @XMLAttribute({namespace: ''})
    public schemeID?: string;

    @XMLAttribute({namespace: ''})
    public schemeName?: string;

    @XMLAttribute({namespace: ''})
    public schemeAgencyName?: string;

    @XMLAttribute({namespace: ''})
    public schemeURI?: string;

    @XMLText({name: ''})
    public Value: string;

    constructor(pii?: PartyIdentificationId) {
        this.schemeID = pii.schemeID;
        this.schemeName = pii.schemeName;
        this.schemeAgencyName = pii.schemeAgencyName;
        this.schemeURI = pii.schemeURI;
        this.Value = pii.Value;
    }
}
