import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class Country {
    @XMLChild({ namespace: CBC })
    public IdentificationCode?: string;

    constructor(country: Country) {
        this.IdentificationCode = country.IdentificationCode;
    }
}
