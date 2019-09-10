import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Contact1564428311705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'contact',
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
                        name: 'type',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'condition',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'document_type_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'document_number',
                        type: 'char',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'ubigeo_id',
                        type: 'integer',
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
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'fixed_phone',
                        type: 'char',
                        length: '20',
                        isNullable: false,
                    },
                    {
                        name: 'mobile_phone',
                        type: 'char',
                        length: '15',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'observations',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'state',
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
            }),
            true,
        );

        await queryRunner.createForeignKeys(
            'contact',
            [
                new TableForeignKey({
                    name: 'FK_DOCUMENT_TYPE',
                    columnNames: ['document_type_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'document_type',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'FK_UBIGEO',
                    columnNames: ['ubigeo_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'ubigeo',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const documentType = await queryRunner.getTable('document_type');
        const fkDocumentType= documentType.foreignKeys.find(fk => fk.columnNames.indexOf('id') !== -1);

        const ubigeo = await queryRunner.getTable('ubigeo');
        const fkUbigeo = await ubigeo.foreignKeys.find(fk => fk.columnNames.indexOf('id') !== -1);

        await queryRunner.dropForeignKey('document_type', fkDocumentType);
        await queryRunner.dropForeignKey('ubigeo', fkUbigeo);
        await queryRunner.dropTable('contact', true);
    }
}
