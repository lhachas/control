import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class PayableAmount {
    @XMLAttribute({ namespace: '' })
    public currencyID?: string;

    @XMLText({ name: '' })
    public Value?: number;

    constructor(pa: PayableAmount) {
        this.currencyID = pa.currencyID;
        this.Value = pa.Value;
    }
}
