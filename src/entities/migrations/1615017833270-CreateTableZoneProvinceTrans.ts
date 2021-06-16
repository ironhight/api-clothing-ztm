import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateTableZoneProvinceTrans1615017833270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "zone_province_trans",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "zone_province_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "locale",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
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

        await queryRunner.createIndex("zone_province_trans", new TableIndex({
            columnNames: ["zone_province_id", "locale"],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zone_province_trans");
    }

}
