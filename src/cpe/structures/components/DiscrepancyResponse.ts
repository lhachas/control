import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class DiscrepancyResponse {
    private referenceId?: string;
    private responseCode?: string;
    private description?: string;

    @XMLChild({ namespace: CBC })
    get ReferenceID(): string {
        return this.referenceId;
    }
    set ReferenceID(referenceId: string) {
        this.referenceId = referenceId;
    }

    @XMLChild({ namespace: CBC })
    get ResponseCode(): string {
        return this.responseCode;
    }
    set ResponseCode(responseCode: string) {
        this.responseCode = responseCode;
    }

    @XMLChild({ namespace: CBC })
    get Description(): string {
        return this.description;
    }
    set Description(description: string) {
        this.description = description;
    }

    constructor(dr: DiscrepancyResponse) {
        this.ReferenceID = dr.ReferenceID;
        this.ResponseCode = dr.ResponseCode;
        this.Description = dr.Description;
    }

    // public Equals(other: DiscrepancyResponse): boolean {
    //     if (this.referenceId) {
    //         return false;
    //     }
    //     return this.referenceId === other.referenceId;
    // }

    // public GetHashCode(): number {
    //     if (this.referenceId) {
    //         return this.GetHashCode();
    //     }
    // }
}
