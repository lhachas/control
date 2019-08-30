import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class TipoDocumento1564419107901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'tipo_documento',
                columns: [
                    {
                        name: 'codigo',
                        type: 'char',
                        length: '10',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'descripcion',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'abreviatura',
                        type: 'char',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'estado',
                        type: 'char',
                        length: '11',
                        // default: 'ACTIVO',
                        comment: 'ACTIVO/INACTIVO',
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
        await queryRunner.dropTable('tipo-documento', true);
    }
}
