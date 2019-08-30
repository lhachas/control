import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Moneda1564516247542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'moneda',
                columns: [
                    {
                        name: 'codigo',
                        type: 'char',
                        length: '50',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'descripcion',
                        type: 'varchar',
                        length: '200',
                        isNullable: false,
                    },
                    {
                        name: 'simbolo',
                        type: 'char',
                        length: '10',
                        isNullable: false,
                    },
                    {
                        name: 'pais',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'tipo_cambio',
                        type: 'float(11,2)',
                        isNullable: false,
                    },
                    {
                        name: 'estado',
                        type: 'char',
                        length: '11',
                        comment: 'ACTIVO/INACTIVO',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('moneda', true);
    }

}
