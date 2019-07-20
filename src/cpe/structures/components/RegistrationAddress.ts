import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@common';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class RegistrationAddress {
    @XMLChild({ namespace: CBC })
    public AddressTypeCode: string;

    constructor(ra: RegistrationAddress) {
        this.AddressTypeCode = ra.AddressTypeCode;
    }
}
