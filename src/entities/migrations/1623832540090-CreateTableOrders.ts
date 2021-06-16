import { Table } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrders1623832540090 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'orders';
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
                            name: 'total',
                            type: 'float',
                        },
                        {
                            name: 'customer',
                            type: 'json',
                        },
                        {
                            name: 'customer_id',
                            type: 'int',
                        },
                        {
                            name: 'payment_method',
                            type: 'json',
                        },
                        {
                            name: 'gateway',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'order_id',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'request_id',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'description',
                            type: 'varchar',
                            length: '255',
                            isNullable: true,
                        },
                        {
                            name: 'title',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'subtotal',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'discount',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'shipping_discount',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'tax',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'shipping',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'shipping_address',
                            type: 'json',
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
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
