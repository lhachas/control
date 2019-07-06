import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { RegistrationAddress } from './RegistrationAddress';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class PartyLegalEntity {
    @XMLChild({ namespace: CBC })
    public RegistrationName?: string;

    @XMLChild({ namespace: CAC })
    public RegistrationAddress?: RegistrationAddress;

    constructor(ple: PartyLegalEntity) {
        this.RegistrationName = ple.RegistrationName;
        this.RegistrationAddress = ple.RegistrationAddress;
    }

}
