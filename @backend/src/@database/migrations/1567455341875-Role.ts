import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as DateFormat from 'dateformat';

export class Role1567455341875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'role',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'rolename',
                        type: 'char',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        length: '500',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '10',
                        comment: 'ACTIVO/INACTIVO',
                        isNullable: false,
                    },
                    {
                        name: 'created_user_id',
                        type: 'integer',
                        default: '0',
                        comment: 'ID USUARIO REGISTRADO',
                        isNullable: false,
                    },
                    {
                        name: 'modified_user_id',
                        type: 'integer',
                        default: '0',
                        comment: 'ID USUARIO MODIFICADO',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'FECHA DE REGISTRO',
                        isNullable: false,
                    },
                    {
                        name: 'modified_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'FECHA DE MODIFICACIÓN',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('role', true);
    }
}
