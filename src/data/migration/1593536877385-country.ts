import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class country1593536877385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "country",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "name", type: "varchar", length: "100" },
                { name: "prefix", type: "varchar", length: "100", default: "'xx'" },
                { name: "createdAt", type: "datetime", default: "NOW()" },
                { name: "updatedAt", type: "datetime", default: "NOW()" }
            ]
        }), true)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("country");
    }

}
