import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import * as DateFormat from 'dateformat';

export class Personal1567455621373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'personal',
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
                        name: 'id_perfil',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'id_contacto',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'id_empresa',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'estado',
                        type: 'char',
                        length: '10',
                        comment: 'ACTIVO/INACTIVO',
                        isNullable: false,
                    },
                    {
                        name: 'id_usuario_registrado',
                        type: 'integer',
                        default: '0',
                        comment: 'ID USUARIO REGISTRADO',
                        isNullable: false,
                    },
                    {
                        name: 'id_usuario_modificado',
                        type: 'integer',
                        default: '0',
                        comment: 'ID USUARIO MODIFICADO',
                        isNullable: false,
                    },
                    {
                        name: 'registrado',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'FECHA DE REGISTRO',
                        isNullable: false,
                    },
                    {
                        name: 'modificado',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        comment: 'FECHA DE MODIFICACIÓN',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: 'FK_PERFIL',
                        columnNames: ['id_perfil'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'perfil',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_CONTACTO',
                        columnNames: ['id_contacto'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'contacto',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_EMPRESA',
                        columnNames: ['id_empresa'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('personal', true);
    }
}
