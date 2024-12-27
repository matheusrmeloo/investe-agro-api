import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressToClient1735237078189 implements MigrationInterface {
    name = 'AddAddressToClient1735237078189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_ef93e5d3f0eb70c0c1983fb462d"`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "address" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "REL_ef93e5d3f0eb70c0c1983fb462"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_10988406220d6ff391e315ba265" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_10988406220d6ff391e315ba265"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "address_id" text`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "client_id" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "REL_ef93e5d3f0eb70c0c1983fb462" UNIQUE ("client_id")`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "address_id" TO "address"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_ef93e5d3f0eb70c0c1983fb462d" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
