import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicationType1692060945177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ADD COLUMN "APPLICATION_TYPE" character varying(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" DROP COLUMN "APPLICATION_TYPE"`
    );
  }
}
