import { MigrationInterface, QueryRunner } from "typeorm";

export class LoanTable1735186380477 implements MigrationInterface {
    name = 'LoanTable1735186380477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loans" ("id" SERIAL NOT NULL, "loanType" character varying NOT NULL, "amount" numeric(12,2) NOT NULL, "interestRate" numeric(12,2) NOT NULL DEFAULT '0', "startDate" date NOT NULL, "endDate" date NOT NULL, "balance" numeric(12,2) NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, "accountId" integer, CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_d7002fbfdf6379b25a869d40e12" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_ea8b450bba20e40d85f1249331a" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_ea8b450bba20e40d85f1249331a"`);
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_d7002fbfdf6379b25a869d40e12"`);
        await queryRunner.query(`DROP TABLE "loans"`);
    }

}
