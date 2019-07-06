import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { X509Data } from './X509Data';

const { KEY_INFO } = prefix;

@XMLElement({ root: KEY_INFO })
export class KeyInfo {
    @XMLChild({ namespace: '' })
    public X509Data: X509Data;

    constructor(keyInfo: KeyInfo) {
        this.X509Data = keyInfo.X509Data;
    }
}
