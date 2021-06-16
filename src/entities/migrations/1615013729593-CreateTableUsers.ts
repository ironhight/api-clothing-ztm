import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateTableUsers1615013729593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "profile_image",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "active",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "token",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "role_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }), true);

        await queryRunner.createIndex("users", new TableIndex({
            isUnique: true,
            columnNames: ["email"]
        }));
        await queryRunner.createIndex("users", new TableIndex({
            columnNames: ["role_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
