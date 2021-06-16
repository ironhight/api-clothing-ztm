import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateTableLogs1615013761268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "logs",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "customer_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "status_code",
                    type: "int",
                },
                {
                    name: "ip",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "user_agent",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "url",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "method",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "detail",
                    type: "json",
                },
                {
                    name: "expire_at",
                    type: "date",
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }), true);

        await queryRunner.createIndex("logs", new TableIndex({
            columnNames: ["customer_id"]
        }));
        await queryRunner.createIndex("logs", new TableIndex({
            columnNames: ["user_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("logs");
    }

}
