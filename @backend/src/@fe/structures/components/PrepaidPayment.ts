import { XMLElement, XMLChild, XMLAttribute } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { PayableAmount } from './PayableAmount';

const { CAC, CBC} = prefix;

@XMLElement({ root: CAC})
export class PrepaidPayment {
    @XMLChild({ namespace: CBC })
    public ID?: string;

    @XMLChild({ namespace: CBC })
    public PaidAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public PaidDate?: string;

    @XMLChild({ namespace: CBC })
    public PaidTime?: string;

    constructor(pp: PrepaidPayment) {
        this.ID = pp.ID;
        this.PaidAmount = pp.PaidAmount;
        this.PaidDate = pp.PaidDate;
        this.PaidTime = pp.PaidTime;
    }

}
