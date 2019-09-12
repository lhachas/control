import { XMLElement, XMLChild} from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { Country } from './Country';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class PostalAddress {
    @XMLChild({ namespace: CBC })
    public ID?: string;

    @XMLChild({ namespace: CBC })
    public StreetName?: string;

    @XMLChild({ namespace: CBC })
    public CitySubdivisionName?: string;

    @XMLChild({ namespace: CBC })
    public CityName?: string;

    @XMLChild({ namespace: CBC })
    public CountrySubentity?: string;

    @XMLChild({ namespace: CBC })
    public District?: string;

    @XMLChild({ namespace: CAC })
    public Country?: Country;

    constructor(pa: PostalAddress) {
        this.ID = pa.ID;
        this.StreetName = pa.StreetName;
        this.CitySubdivisionName = pa.CitySubdivisionName;
        this.CityName = pa.CityName;
        this.CountrySubentity = pa.CountrySubentity;
        this.District = pa.District;
        this.Country = pa.Country;
    }
}
