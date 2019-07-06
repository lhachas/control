import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { TaxSchemeId } from './TaxSchemeId';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class TaxScheme {
    @XMLChild({ namespace: CBC })
    public ID?: TaxSchemeId;

    @XMLChild({ namespace: CBC })
    public Name?: string;

    @XMLChild({ namespace: CBC })
    public TaxTypeCode?: string;

    constructor(te: TaxScheme) {
        this.ID = te.ID;
        this.Name = te.Name;
        this.TaxTypeCode = te.TaxTypeCode;
    }
}
