import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Staff1567455621373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'staff',
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
                        name: 'role_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'contact_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'company_id',
                        type: 'integer',
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
                foreignKeys: [
                    new TableForeignKey({
                        name: 'FK_ROLE',
                        columnNames: ['role_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'role',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_CONTACT',
                        columnNames: ['contact_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'contact',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_COMPANY',
                        columnNames: ['company_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'company',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('staff', true);
    }
}
