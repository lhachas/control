import { MigrationInterface, QueryRunner, Table} from 'typeorm';

export class MedioPago1564516519248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'medio_pago',
                columns: [
                    {
                        name: 'medio',
                        type: 'varchar',
                        length: '100',
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
        await queryRunner.dropTable('medio_pago', true);
    }

}
