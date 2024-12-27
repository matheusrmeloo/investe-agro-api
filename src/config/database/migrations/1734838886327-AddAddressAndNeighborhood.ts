import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressAndNeighborhood1734838886327 implements MigrationInterface {
    name = 'AddAddressAndNeighborhood1734838886327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying, "complement" character varying, "client_id" uuid, "neighborhood_id" uuid, CONSTRAINT "REL_ef93e5d3f0eb70c0c1983fb462" UNIQUE ("client_id"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "neighborhoods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "UQ_64aa4291cfb56c052b68bd9a574" UNIQUE ("name"), CONSTRAINT "PK_249f3b7c3601adff79e56fa36f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_ef93e5d3f0eb70c0c1983fb462d" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_6741b6c68f7ac6b041f0a4b0fb4" FOREIGN KEY ("neighborhood_id") REFERENCES "neighborhoods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_6741b6c68f7ac6b041f0a4b0fb4"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_ef93e5d3f0eb70c0c1983fb462d"`);
        await queryRunner.query(`DROP TABLE "neighborhoods"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
