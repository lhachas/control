import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserSettings1567455622370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'user_settings',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'settings',
                        type: 'json',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '10',
                        isNullable: false,
                        comment: 'ACTIVO/INACTIVO',
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
        await queryRunner.dropTable('user_starred', true);
    }
}
