import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { UbigeoModel as Ubigeo } from '@control/api/models/ubigeo.model';

define(Ubigeo, (faker: typeof Faker, settings: { role: string }) => {
    const ubigeo = new Ubigeo();
    const gender = faker.random.number(1);
    ubigeo.ubigeo = faker.address.zipCode();
    ubigeo.departamento = faker.address.country();
    ubigeo.provincia = faker.address.city();
    ubigeo.distrito = faker.address.state();
    ubigeo.codigoPais = faker.address.countryCode();
    return ubigeo;
});
