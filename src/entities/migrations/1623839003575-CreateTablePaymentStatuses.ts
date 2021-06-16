import { Table } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePaymentStatuses1623839003575 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'payment_statuses';
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
                            name: 'code',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'description',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'order_id',
                            type: 'int',
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
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
