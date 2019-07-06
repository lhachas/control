import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { ExtensionContent } from './ExtensionContent';

const { EXT } = prefix;

@XMLElement({ root: EXT })
export class UblExtension {
    private extensionContent?: string;

    @XMLChild({ namespace: EXT })
    get ExtensionContent(): string {
        return this.extensionContent;
    }
    set ExtensionContent(extensionContent: string) {
        this.extensionContent = extensionContent;
    }

    constructor() {
        this.ExtensionContent = '';
    }
}
