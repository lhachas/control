import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class TaxSchemeId {
    @XMLAttribute({ namespace: '' })
    public schemeID?: string;

    @XMLAttribute({ namespace: '' })
    public schemeAgencyID?: string;

    @XMLText({ name: '' })
    public Value: number;

    constructor(tsi: TaxSchemeId) {
        this.schemeID = tsi.schemeID;
        this.schemeAgencyID = tsi.schemeAgencyID;
        this.Value = tsi.Value;
    }
}
