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

    async saveToken(id: number, token: string): Promise<UpdateResult> {
        try {
            return await this.userRepository.update({ id }, { token });
        } catch (error) {
            throw error;
        }
    }

    async getUser(email: string): Promise<UserModel> {
        try {
            const user = await this.userRepository
                                        .createQueryBuilder('user')
                                        .innerJoinAndSelect('user.staff', 'staff')
                                        .innerJoinAndSelect('staff.role', 'role')
                                        .innerJoinAndSelect('staff.contact', 'contact')
                                        .where('contact.email = :email', { email })
                                        .getOne();
            return user;
        } catch (error) {
            throw new NotFoundException(`El usuario con el email: [${email}] no se encontró.`);
        }
    }
}
