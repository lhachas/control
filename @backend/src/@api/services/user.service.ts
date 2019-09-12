import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserModel } from '@control/api/models/user.model';

@Injectable()
export class UserService extends TypeOrmCrudService<UserModel> {

    constructor(@InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>) {
        super(userRepository);
    }

    /**
     * @description guarda el token en la BD.
     * @param id [number]
     * @param token [string]
     */
    async updateToken(id: number, token: string): Promise<UserModel> {
        try {
            await this.userRepository.createQueryBuilder()
                        .update(UserModel)
                        .set({ token })
                        .where('id=:id', { id })
                        .execute();
            return await this.getUser('user.id', id.toString());
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description obtiene un usuario
     * @param field [string] @example 'contact.id'
     * @param value [string] @example '1'
     */
    async getUser(field: string, value: string): Promise<UserModel> {
        try {
            const val = field.split('.');
            const findField = val[val.length-1];
            const user = await this.userRepository
                                        .createQueryBuilder('user')
                                        .innerJoinAndSelect('user.staff', 'staff')
                                        .innerJoinAndSelect('staff.role', 'role')
                                        .innerJoinAndSelect('staff.contact', 'contact')
                                        .where(`${field}=:${findField}`, { [findField]: value })
                                        .getOne();
            return user;
        } catch (error) {
            throw new NotFoundException(`El usuario con el ${field}: [${value}] no se encontró.`);
        }
    }
}
