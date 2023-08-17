import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicantNameToApplications1692145069290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ADD COLUMN "APPLICANT_NAME" character varying(300)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" DROP COLUMN "APPLICANT_NAME"`
    );
  }
}
