import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class TaxSchemeId {
    @XMLAttribute({ namespace: '' })
    public schemeID?: string;

    @XMLAttribute({ namespace: '' })
    public schemeName?: string;

    @XMLAttribute({ namespace: '' })
    public schemeAgencyID?: string;

    public schemeAgencyName?: string;

    @XMLAttribute({ namespace: '' })
    public schemeURI?: string;

    @XMLText({ name: '' })
    public Value: number;

    constructor(tsi: TaxSchemeId) {
        this.schemeID = tsi.schemeID;
        this.schemeName = tsi.schemeName;
        this.schemeAgencyID = tsi.schemeAgencyID;
        this.schemeAgencyName = tsi.schemeAgencyName;
        this.schemeURI = tsi.schemeURI;
        this.Value = tsi.Value;
    }
}
