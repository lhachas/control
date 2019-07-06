import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { UblExtension } from './UblExtension';

const { EXT } = prefix;

interface IUblExtensios {
    UblExtension?: UblExtension;
}

@XMLElement({ root: EXT })
export class UblExtensions {

    @XMLChild({ namespace: EXT })
    public UBLExtension: UblExtension;
    
    constructor() {
        this.UBLExtension = new UblExtension();
    }
}
