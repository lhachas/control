import { Factory, times } from 'typeorm-seeding';
import { Connection, Repository, EntityRepository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UbigeoModel as Ubigeo } from '@control/api/models/ubigeo.model';

@EntityRepository(Ubigeo)
export class UbigeoRepo extends Repository<Ubigeo> {}

// tslint:disable-next-line: max-classes-per-file
export class UbigeoFactory {
    constructor(@OrmRepository() private readonly ubigeoRepo: UbigeoRepo) {}

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        console.log(em);

        // await times(10, async (n) => {
        //     const ub = await factory(Ubigeo)().seedMany(10);
        //     return await this.ubigeoRepo.save(ub);
        // });
        await factory(Ubigeo)().seedMany(10);
    }
}
