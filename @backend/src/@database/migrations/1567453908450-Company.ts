import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Company1567453908450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'company',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'ruc',
                        type: 'char',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'business_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'trade_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'representative',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'ubigeo_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'arigv',
                        type: 'char',
                        length: '2',
                        comment: 'Agente Retencion IGV | SI/NO',
                        isNullable: false,
                    },
                    {
                        name: 'apvi',
                        type: 'char',
                        length: '2',
                        comment: 'Agente Percepcion Venta Interna | SI/NO',
                        isNullable: false,
                    },
                    {
                        name: 'apcl',
                        type: 'char',
                        length: '2',
                        comment: 'Agente Percepcion Combustible Liquido | SI/NO',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'urbanization',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'fixed_phone',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'mobile_phone',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'activity',
                        type: 'varchar',
                        length: '250',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '250',
                        isNullable: false,
                    },
                    {
                        name: 'logo',
                        type: 'varchar',
                        length: '500',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '10',
                        // default: 'ACTIVO',
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
                foreignKeys: [
                    new TableForeignKey({
                        name: 'FK_UBIGEO_COMPANY',
                        columnNames: ['ubigeo_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'ubigeo',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    // new TableForeignKey({
                    //     name: 'FK_REPRESENTANTE_EMPRESA',
                    //     columnNames: ['representante'],
                    //     referencedColumnNames: ['id'],
                    //     referencedTableName: 'contacto',
                    //     onDelete: 'CASCADE',
                    //     onUpdate: 'CASCADE',
                    // }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('company', true);
    }
}
