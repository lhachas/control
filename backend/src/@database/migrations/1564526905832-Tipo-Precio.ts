import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TipoPrecio1564526905832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'tipo_precio',
                columns: [
                    {
                        name: 'codigo',
                        type: 'char',
                        length: '2',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'descripcion',
                        type: 'varchar',
                        length: '1000',
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
        await queryRunner.dropTable('tipo_precio', true);
    }

}
