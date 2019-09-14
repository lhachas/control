import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class User1567456384061 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
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
                        name: 'staff_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'user_setting_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'username',
                        type: 'char',
                        isUnique: true,
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '5000',
                        isNullable: false,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        length: '5000',
                        comment: 'TOKEN GENERADO JWT',
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
                        name: 'FK_STAFF_USER',
                        columnNames: ['staff_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'staff',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_SETTING_USER',
                        columnNames: ['user_setting_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'user_settings',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user', true);
    }
}
