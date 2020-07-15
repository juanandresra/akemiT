import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class session1594758233119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "session",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: "active", type: "bit" },
                    { name: "ip", type: "varchar" },
                    { name: "hash", type: "varchar" },
                    { name: "expireAt", type: "datetime" },
                    { name: "createdAt", type: "datetime", default: "NOW()" },
                    { name: "updatedAt", type: "datetime", default: "NOW()" }
                ],
            }),
            true
        );

        await queryRunner.addColumn("session", new TableColumn(
            { name: "user_id", type: "int" }
        ));

        await queryRunner.createForeignKey("session", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("session");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("session", foreignKey!);
        await queryRunner.dropTable("session");
    }

}
