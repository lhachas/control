import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DebitNoteType1564508232629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'debit_note_type',
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
                        name: 'code',
                        type: 'char',
                        length: '2',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '1000',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '11',
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
        await queryRunner.dropTable('debit_note_type', true);
    }
}
