import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Ubigeo1564427948311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'ubigeo',
                columns: [
                    {
                        name: 'ubigeo',
                        type: 'char',
                        length: '20',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'departamento',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'provincia',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'distrito',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'codigo_pais',
                        type: 'char',
                        length: '2',
                        isNullable: false,
                    },
                    // {
                    //     name: 'registrado',
                    //     type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
                    //     default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
                    //     isNullable: false,
                    // },
                    // {
                    //     name: 'modificado',
                    //     type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
                    //     default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
                    //     isNullable: false,
                    // },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('ubigeo', true);
    }
}
