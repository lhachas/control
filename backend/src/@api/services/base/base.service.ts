import {
    BaseEntity,
    InsertResult,
    Repository,
    UpdateResult,
    DeleteResult,
    Entity,
    DeepPartial,
} from 'typeorm';

// tslint:disable-next-line: no-shadowed-variable
export abstract class BaseService<Entity extends BaseEntity> {
    constructor(
        public repository: Repository<Entity>,
    ) { }

    public async nuevo(entity: DeepPartial<Entity>): Promise<Entity> {
        try {
            return await this.repository.create(entity);
        } catch (error) {
            throw error;
        }
    }

    public async actualizar(id: string|number, entity: any): Promise<UpdateResult> {
        try {
            return await this.repository.update(id, entity);
        } catch (error) {
            throw error;
        }
    }

    public async eliminar(id: string|number, entity: any): Promise<DeleteResult> {
        try {
            return await this.repository
                .createQueryBuilder()
                .delete()
                .from(entity)
                .where('id = :id', { id: 1 })
                .execute();
        } catch (error) {
            throw error;
        }
    }
}
