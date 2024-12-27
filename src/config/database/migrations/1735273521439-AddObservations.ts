import { MigrationInterface, QueryRunner } from "typeorm";

export class AddObservations1735273521439 implements MigrationInterface {
    name = 'AddObservations1735273521439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "observations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "PK_f9208d64f50a76030758087c0ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "observations" ADD CONSTRAINT "FK_568add79245fb15b18e5335eccd" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "observations" DROP CONSTRAINT "FK_568add79245fb15b18e5335eccd"`);
        await queryRunner.query(`DROP TABLE "observations"`);
    }

}
