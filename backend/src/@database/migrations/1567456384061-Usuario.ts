import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import * as DateFormat from 'dateformat';

export class Usuario1567456384061 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'usuario',
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
                        name: 'id_personal',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'usuario',
                        type: 'char',
                        isUnique: true,
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'clave',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        length: '500',
                        comment: 'TOKEN GENERADO JWT',
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
                        name: 'FK_PERSONAL_USUARIO',
                        columnNames: ['id_personal'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'personal',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('usuario', true);
    }
}
