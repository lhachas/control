import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class PartyName {
    @XMLChild({ namespace: CBC })
    public Name?: string;

    constructor(pn: PartyName) {
        this.Name = pn.Name;
    }
}
