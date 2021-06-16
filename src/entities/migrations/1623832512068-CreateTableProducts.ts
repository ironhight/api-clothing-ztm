import { Table } from 'typeorm';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1623832512068 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableName = 'products';
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
                            name: 'active',
                            type: 'boolean',
                            default: true,
                        },
                        {
                            name: 'image',
                            type: 'varchar',
                            length: '255',
                        },
                        {
                            name: 'price',
                            type: 'integer',
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
