import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { UbigeoEntity as Ubigeo } from '@control/db/entities/ubigeo.entity';

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
