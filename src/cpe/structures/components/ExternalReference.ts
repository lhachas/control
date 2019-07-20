import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class ExternalReference {
    private uri?: string;

    @XMLChild({ namespace: CBC, name: 'URI' })
    get Uri(): string {
        return this.uri;
    }
    set Uri(uri: string) {
        this.uri = uri;
    }

    constructor(er: ExternalReference) {
        this.Uri = er.Uri;
    }
}
