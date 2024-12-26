import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountTable1735179696693 implements MigrationInterface {
    name = 'AccountTable1735179696693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "accountNumber" character varying NOT NULL, "accountType" character varying NOT NULL, "balance" numeric(10,2) NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63" UNIQUE ("accountNumber"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
