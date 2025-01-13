import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewEnumValueToProduction1736139840941 implements MigrationInterface {
    name = 'AddNewEnumValueToProduction1736139840941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."productions_type_enum" RENAME TO "productions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."productions_type_enum" AS ENUM('pecuaria', 'milho', 'mandioca', 'fumo', 'batata doce', 'outros')`);
        await queryRunner.query(`ALTER TABLE "productions" ALTER COLUMN "type" TYPE "public"."productions_type_enum" USING "type"::"text"::"public"."productions_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."productions_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."productions_type_enum_old" AS ENUM('pecuaria', 'milho', 'outros')`);
        await queryRunner.query(`ALTER TABLE "productions" ALTER COLUMN "type" TYPE "public"."productions_type_enum_old" USING "type"::"text"::"public"."productions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."productions_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."productions_type_enum_old" RENAME TO "productions_type_enum"`);
    }

}
