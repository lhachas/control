import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { AddressTypeCode } from './AddressTypeCode';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class RegistrationAddress {
    @XMLChild({ namespace: CBC })
    public AddressTypeCode: AddressTypeCode;

    constructor(ra: RegistrationAddress) {
        this.AddressTypeCode = ra.AddressTypeCode;
    }
}
