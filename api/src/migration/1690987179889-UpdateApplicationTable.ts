import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateApplicationTable1690987179889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ALTER COLUMN "DELETED_AT" DROP DEFAULT, ALTER COLUMN "DELETED_AT" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" DROP COLUMN "FACILITY_NAME"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ADD COLUMN "CONFIRMATION_ID" character varying(200) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ALTER COLUMN "ASSIGNED_TO_USER_ID" DROP NOT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ALTER COLUMN "STATUS" SET DEFAULT 'RECEIVED'`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_ATTACHMENT" DROP COLUMN "ATTACHMENT_ID_NAME"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ADD COLUMN "FACILITY_NAME" character varying(200) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" DROP COLUMN "CONFIRMATION_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ALTER COLUMN "ASSIGNED_TO_USER_ID" SET NOT NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ALTER COLUMN "STATUS" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_ATTACHMENT" ADD COLUMN "ATTACHMENT_ID_NAME" character varying(100) NOT NULL`
    );
  }
}
