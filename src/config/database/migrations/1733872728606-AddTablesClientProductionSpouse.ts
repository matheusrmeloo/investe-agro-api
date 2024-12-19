import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablesClientProductionSpouse1733872728606 implements MigrationInterface {
    name = 'AddTablesClientProductionSpouse1733872728606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."productions_type_enum" AS ENUM('pecuaria', 'milho', 'outros')`);
        await queryRunner.query(`CREATE TABLE "productions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."productions_type_enum" NOT NULL, "custom_type" character varying, "clientId" uuid, CONSTRAINT "PK_395fda0b6f26cb5fd9a2aa6315c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "document_number" character varying NOT NULL, "phone" character varying, "email" character varying, "address" text, "birth_date" date, "social_status" character varying, CONSTRAINT "UQ_e9a9c65032a13279f68ba077fc3" UNIQUE ("document_number"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spouses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "document_number" character varying NOT NULL, "phone" character varying, "birth_date" date NOT NULL, "clientId" uuid, CONSTRAINT "UQ_d8385670118c5047edfc7d4c408" UNIQUE ("document_number"), CONSTRAINT "PK_48f51567180ad7f9635ca787d44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "productions" ADD CONSTRAINT "FK_046ff3c48775a276c365c804d8d" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spouses" ADD CONSTRAINT "FK_d8cdb37758fa6424a1facc0f9e6" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spouses" DROP CONSTRAINT "FK_d8cdb37758fa6424a1facc0f9e6"`);
        await queryRunner.query(`ALTER TABLE "productions" DROP CONSTRAINT "FK_046ff3c48775a276c365c804d8d"`);
        await queryRunner.query(`DROP TABLE "spouses"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "productions"`);
        await queryRunner.query(`DROP TYPE "public"."productions_type_enum"`);
    }

}
