import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '@control/config/db/ormconfig';

export class Database1564418107000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        if (! await queryRunner.hasDatabase(database.toString())) {
            console.info('La base de datos: [', database.toString(), '] No existe.');
            await queryRunner.createDatabase(database.toString(), true);
        } else {
            console.info('Ya existe base de datos con el nombre: [', database.toString(), ']');
            await queryRunner.query(`use ${database.toString()};`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropDatabase(database.toString());
    }
}
