import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueKeyFromNameNeighborhood1735789426948 implements MigrationInterface {
    name = 'RemoveUniqueKeyFromNameNeighborhood1735789426948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "neighborhoods" DROP CONSTRAINT "UQ_64aa4291cfb56c052b68bd9a574"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "neighborhoods" ADD CONSTRAINT "UQ_64aa4291cfb56c052b68bd9a574" UNIQUE ("name")`);
    }

}
