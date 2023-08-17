import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAttachmentUuidToAttachmentTable1692286333588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_ATTACHMENT" ADD COLUMN "ATTACHMENT_CHEFS_UUID" uuid`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_ATTACHMENT" DROP COLUMN "ATTACHMENT_CHEFS_UUID"`
    );
  }
}
