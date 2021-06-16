import { TableIndex } from 'typeorm';
import { Table } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomers1623835254948 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'customers';
        if (!(await queryRunner.hasTable(tableName))) {
            await queryRunner.createTable(
                new Table({
                    name: tableName,
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'deleted_at',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'profile_image',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'password',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'phone',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'profile_id',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'register_source',
                            type: 'enum',
                            enum: ['app', 'google', 'facebook'],
                            enumName: 'registerSourceCustomerEnum',
                            default: `'app'`,
                        },
                        {
                            name: 'active',
                            type: 'boolean',
                            default: true,
                        },
                        {
                            name: 'token',
                            type: 'text',
                            isNullable: true,
                        },
                        {
                            name: 'reset_code',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'expire_reset_code',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'invite_code',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'expire_invite_code',
                            type: 'datetime',
                            isNullable: true,
                        },
                        {
                            name: 'affiliate_id',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'now()',
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'now()',
                        },
                    ],
                }),
                true,
            );

            await queryRunner.createIndex(
                tableName,
                new TableIndex({
                    isUnique: true,
                    columnNames: ['email', 'register_source'],
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
