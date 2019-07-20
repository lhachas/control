import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { Party } from './Party';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class AccountingSupplierParty {
    @XMLChild({ namespace: CBC, name: 'CustomerAssignedAccountID' })
    public CustomerAssignedAccountID?: string;

    @XMLChild({ namespace: CBC })
    public AdditionalAccountID?: string;

    @XMLChild({ namespace: CAC })
    public Party?: Party;

    constructor(asp: AccountingSupplierParty) {
        this.CustomerAssignedAccountID = asp.CustomerAssignedAccountID;
        this.AdditionalAccountID = asp.AdditionalAccountID;
        this.Party = asp.Party;
    }
}
