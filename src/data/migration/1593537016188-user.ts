import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class user1593537016188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "user",
            columns: [
              { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
              { name: "email", type: "varchar" },
              { name: "password", type: "varchar" },
              { name: "firstName", type: "varchar" },
              { name: "lastName", type: "varchar" },
              { name: "createdAt", type: "datetime", default: "NOW()" },
              { name: "updatedAt", type: "datetime", default: "NOW()" }
            ],
          }),
          true
        );

        await queryRunner.addColumn("user", new TableColumn(
            { name: "country_id", type: "int" }
        ));

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["country_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "country",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("country_id") !== -1);
        await queryRunner.dropForeignKey("user", foreignKey!);
        await queryRunner.dropTable("user");
    }

}
