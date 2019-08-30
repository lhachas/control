import { XMLElement, XMLAttribute, XMLText} from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class AddressTypeCode {
    @XMLAttribute({ name: '' })
    public listAgencyName?: string;

    @XMLAttribute({ name: '' })
    public listName?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(atc: AddressTypeCode) {
        this.listAgencyName = atc.listAgencyName;
        this.listName = atc.listName;
        this.Value = atc.Value;
    }
}
