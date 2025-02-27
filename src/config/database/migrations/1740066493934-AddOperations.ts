import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOperations1740066493934 implements MigrationInterface {
    name = 'AddOperations1740066493934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."operations_measurement_land_area_enum" AS ENUM('m2', 'tarefa', 'hectare')`);
        await queryRunner.query(`CREATE TYPE "public"."operations_measurement_production_area_enum" AS ENUM('m2', 'tarefa', 'hectare')`);
        await queryRunner.query(`CREATE TYPE "public"."operations_measurement_plowed_area_enum" AS ENUM('m2', 'tarefa', 'hectare')`);
        await queryRunner.query(`CREATE TYPE "public"."operations_measurement_agricultural_production_enum" AS ENUM('g', 'kg', 't')`);
        await queryRunner.query(`CREATE TABLE "operations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "observation" text, "land_area" integer NOT NULL, "measurement_land_area" "public"."operations_measurement_land_area_enum" NOT NULL, "production_area" integer NOT NULL, "measurement_production_area" "public"."operations_measurement_production_area_enum" NOT NULL, "plowed_area" integer NOT NULL, "measurement_plowed_area" "public"."operations_measurement_plowed_area_enum" NOT NULL, "agricultural_production" numeric(10,2) NOT NULL, "measurement_agricultural_production" "public"."operations_measurement_agricultural_production_enum" NOT NULL, "client_id" uuid, "production_id" uuid, CONSTRAINT "PK_7b62d84d6f9912b975987165856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "car_caf" boolean NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."productions_type_enum" RENAME TO "productions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."productions_type_enum" AS ENUM('pecuaria', 'milho', 'mandioca', 'fumo', 'batata doce', 'trator', 'outros')`);
        await queryRunner.query(`ALTER TABLE "productions" ALTER COLUMN "type" TYPE "public"."productions_type_enum" USING "type"::"text"::"public"."productions_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."productions_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "operations" ADD CONSTRAINT "FK_a6b0718351bc24c57a9a64b70b1" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operations" ADD CONSTRAINT "FK_1cce81de8d5fcecdcf590e5088b" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operations" DROP CONSTRAINT "FK_1cce81de8d5fcecdcf590e5088b"`);
        await queryRunner.query(`ALTER TABLE "operations" DROP CONSTRAINT "FK_a6b0718351bc24c57a9a64b70b1"`);
        await queryRunner.query(`CREATE TYPE "public"."productions_type_enum_old" AS ENUM('pecuaria', 'milho', 'mandioca', 'fumo', 'batata doce', 'outros')`);
        await queryRunner.query(`ALTER TABLE "productions" ALTER COLUMN "type" TYPE "public"."productions_type_enum_old" USING "type"::"text"::"public"."productions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."productions_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."productions_type_enum_old" RENAME TO "productions_type_enum"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "car_caf"`);
        await queryRunner.query(`DROP TABLE "operations"`);
        await queryRunner.query(`DROP TYPE "public"."operations_measurement_agricultural_production_enum"`);
        await queryRunner.query(`DROP TYPE "public"."operations_measurement_plowed_area_enum"`);
        await queryRunner.query(`DROP TYPE "public"."operations_measurement_production_area_enum"`);
        await queryRunner.query(`DROP TYPE "public"."operations_measurement_land_area_enum"`);
    }

}
