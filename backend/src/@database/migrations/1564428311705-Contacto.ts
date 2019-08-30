import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Contacto1564428311705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'contacto',
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
                        name: 'tipo',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'condicion',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'tipo_documento',
                        type: 'char',
                        length: '10',
                        isNullable: false,
                        isPrimary: true,
                    },
                    {
                        name: 'nro_documento',
                        type: 'char',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'ubigeo',
                        type: 'char',
                        length: '20',
                        isNullable: false,
                        isPrimary: true,
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
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'departamento',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'provincia',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'distrito',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'telf_fijo',
                        type: 'char',
                        length: '20',
                        isNullable: false,
                    },
                    {
                        name: 'telf_movil',
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
                        name: 'observaciones',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'estado',
                        type: 'char',
                        length: '10',
                        // default: 'ACTIVO',
                        isNullable: false,
                        comment: 'ACTIVO/INACTIVO',
                    },
                    // {
                    //     name: 'registrado',
                    //     type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
                    //     default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
                    //     isNullable: false,
                    // },
                    // {
                    //     name: 'modificado',
                    //     type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
                    //     default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
                    //     isNullable: false,
                    // },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys(
            'contacto',
            [
                new TableForeignKey({
                    name: 'FK_TIPO_DOCUMENTO',
                    columnNames: ['tipo_documento'],
                    referencedColumnNames: ['codigo'],
                    referencedTableName: 'tipo_documento',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'FK_UBIGEO',
                    columnNames: ['ubigeo'],
                    referencedColumnNames: ['ubigeo'],
                    referencedTableName: 'ubigeo',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const tipoDocumento = await queryRunner.getTable('tipo-documento');
        const fkTipoDocumento = tipoDocumento.foreignKeys.find(fk => fk.columnNames.indexOf('tipo-documento') !== -1);

        const ubigeo = await queryRunner.getTable('ubigeo');
        const fkUbigeo = await ubigeo.foreignKeys.find(fk => fk.columnNames.indexOf('ubigeo') !== -1);

        await queryRunner.dropForeignKey('tipo_documento', fkTipoDocumento);
        await queryRunner.dropForeignKey('ubigeo', fkUbigeo);
        await queryRunner.dropTable('contactos', true);
    }
}
