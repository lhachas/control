import { XMLElement, XMLText, XMLAttribute } from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class InvoicedQuantity {
    @XMLAttribute({ namespace: '' })
    public unitCode?: string;

    @XMLText({ name: '' })
    public Value: number;

    constructor(iq: InvoicedQuantity) {
        this.unitCode = iq.unitCode;
        this.Value = iq.Value;
    }
}
