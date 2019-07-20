import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class TaxExemptionReasonCode {
    @XMLAttribute({ namespace: '' })
    public listAgencyName?: string;

    @XMLAttribute({ namespace: '' })
    public listName?: string;

    @XMLAttribute({ namespace: '' })
    public listURI?: string;

    @XMLText({ name: '' })
    public Value?: string;

    constructor(terc: TaxExemptionReasonCode) {
        this.listAgencyName = terc.listAgencyName;
        this.listName = terc.listName;
        this.listURI = terc.listURI;
        this.Value = terc.Value;
    }
}
