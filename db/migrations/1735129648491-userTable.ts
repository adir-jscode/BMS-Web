import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1735129648491 implements MigrationInterface {
    name = 'UserTable1735129648491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uniqueId" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8bc6480559fb1d6f261d064949c" UNIQUE ("uniqueId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
