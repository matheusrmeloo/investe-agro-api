import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyClients1740188881850 implements MigrationInterface {
    name = 'ModifyClients1740188881850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "car_caf"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "car" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "caf_dap" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "caf_dap_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "caf_dap_number"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "caf_dap"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "car"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "car_caf" boolean NOT NULL`);
    }

}
