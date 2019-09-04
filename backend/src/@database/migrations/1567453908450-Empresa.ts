import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import * as DateFormat from 'dateformat';

export class Empresa1567453908450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'empresa',
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
                        name: 'razon_social',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'nombre_comercial',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'representante',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'id_ubigeo',
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
                        name: 'direccion',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'urbanizacion',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'telf_fijo',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'telf_movil',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'actividad',
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
                        name: 'FK_UBIGEO_EMPRESA',
                        columnNames: ['id_ubigeo'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'ubigeo',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_REPRESENTANTE_EMPRESA',
                        columnNames: ['representante'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'contacto',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('empresa', true);
    }
}
