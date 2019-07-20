import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@common';
import { AdditionalInformation } from './AdditionalInformation';

const { CAC } = prefix;

@XMLElement({ root: CAC })
export class ExtensionContent {
    private additionalInformation?: AdditionalInformation;

    @XMLChild({ namespace: CAC })
    get AdditionalInformation(): AdditionalInformation {
        return this.additionalInformation;
    }
    set AdditionalInformation(additionalInformation: AdditionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    constructor() {
        this.AdditionalInformation = new AdditionalInformation();
    }
}
