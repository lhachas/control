import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class UserStarred1568422564634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'user_starred',
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
                        name: 'user_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'contact_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '10',
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
                        name: 'FK_STARRED_USER',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'user',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                    new TableForeignKey({
                        name: 'FK_STARRED_CONTACT',
                        columnNames: ['contact_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'contact',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_starred', true);
    }
}
