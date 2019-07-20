import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class PriceTypeCode {
    @XMLAttribute({ namespace: '' })
    public listName?: string;

    @XMLAttribute({ namespace: '' })
    public listAgencyName?: string;

    @XMLAttribute({ namespace: '' })
    public listURI?: string;

    @XMLText({ name: '' })
    public Value?: string;

    constructor(acp: PriceTypeCode) {
        this.listName = acp.listName;
        this.listAgencyName = acp.listAgencyName;
        this.listURI = acp.listURI;
        this.Value = acp.Value;
    }
}
