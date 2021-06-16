import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateTableZoneProvinces1615017816611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "zone_provinces",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "normal_id",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "code",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "active",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "lat",
                    type: "double",
                    isNullable: true,
                    default: null,
                },
                {
                    name: "lng",
                    type: "double",
                    isNullable: true,
                    default: null,
                },
                {
                    name: "sort_order",
                    type: "int",
                    default: 0,
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

        await queryRunner.createIndex("zone_provinces", new TableIndex({
            columnNames: ["code"],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zone_provinces");
    }

}
