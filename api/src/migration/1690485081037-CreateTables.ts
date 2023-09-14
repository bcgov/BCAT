import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1690485081037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create tables
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_USER" ("USER_ID" SERIAL NOT NULL, "USER_NAME" character varying(100), "DISPLAY_NAME" character varying(200), "USER_GUID" UUID NOT NULL, "IS_AUTHORIZED" boolean NOT NULL, "IS_ADMIN" boolean NOT NULL, "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default", CONSTRAINT "BCAT_USER_PK" PRIMARY KEY ("USER_ID") )`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_APPLICATION" ("APPLICATION_ID" SERIAL NOT NULL, "FORM_METADATA_ID" integer NOT NULL, "ASSIGNED_TO_USER_ID" integer NOT NULL, "SUBMISSION_ID" UUID NOT NULL, "SUBMISSION" JSONB NOT NULL, "FACILITY_NAME" character varying(200) NOT NULL, "PROJECT_TITLE" character varying(100) NOT NULL, "TOTAL_ESTIMATED_COST" money, "ASKS" money, "STATUS" character varying(100) NOT NULL, "DELETED_AT" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DELETED_BY_USER_ID" integer, "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",CONSTRAINT "BCAT_APPLICATION_PK" PRIMARY KEY ("APPLICATION_ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_BROADER_REVIEW_SCORE" ("BROADER_REVIEW_SCORE_ID" SERIAL NOT NULL, "USER_ID" integer NOT NULL, "APPLICATION_ID" integer NOT NULL, "DATA" JSONB, "FINAL_SCORE" integer, "OVERALL_COMMENTS"character varying(2000), "COMPLETION_STATUS"character varying(30), "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",CONSTRAINT "BCAT_BROADER_REVIEW_SCORE_PK" PRIMARY KEY ("BROADER_REVIEW_SCORE_ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_COMMENT" ("COMMENT_ID" SERIAL NOT NULL, "USER_ID" integer NOT NULL, "APPLICATION_ID" integer NOT NULL, "OVERALL_COMMENTS"character varying(2000), "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default", CONSTRAINT "BCAT_COMMENT_PK" PRIMARY KEY ("COMMENT_ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_WORKSHOP_SCORE" ("WORKSHOP_SCORE_ID" SERIAL NOT NULL, "USER_ID" integer NOT NULL, "APPLICATION_ID" integer NOT NULL, "DATA" JSONB, "FINAL_SCORE" integer, "OVERALL_COMMENTS"character varying(2000), "COMPLETION_STATUS"character varying(30), "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default", CONSTRAINT "BCAT_WORKSHOP_SCORE_PK" PRIMARY KEY ("WORKSHOP_SCORE_ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_ATTACHMENT" ("ATTACHMENT_ID" SERIAL NOT NULL, "APPLICATION_ID" integer NOT NULL, "ATTACHMENT_ID_NAME" character varying(100) NOT NULL, "DATA" BYTEA, "URL" character varying(200) NOT NULL, "ORIGINAL_NAME" character varying(200) NOT NULL, "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default", CONSTRAINT "BCAT_ATTACHMENT_PK" PRIMARY KEY ("ATTACHMENT_ID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_bcat"."BCAT_FORM_METADATA" ("FORM_METADATA_ID" SERIAL NOT NULL, "NAME" character varying(200) NOT NULL, "DESCRIPTION" character varying(2000) NOT NULL, "CHEFS_FORM_ID" UUID NOT NULL, "VERSION_SCHEMA" JSONB NOT NULL, "VERSION_ID" UUID NOT NULL, "ACTIVE" boolean NOT NULL DEFAULT TRUE, "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0, "APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_CREATE_USER_ID" integer, "APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default", "APP_LAST_UPDATE_USER_ID" integer, "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default", "DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now()::timestamp without time zone, "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default", CONSTRAINT "BCAT_FORM_METADATA_PK" PRIMARY KEY ("FORM_METADATA_ID"))`
    );

    // add indexes
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_APPLICATION_FORM_METADATA_ID" ON "app_bcat"."BCAT_APPLICATION" ("FORM_METADATA_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_APPLICATION_ASSIGNED_TO_USER_ID" ON "app_bcat"."BCAT_APPLICATION" ("ASSIGNED_TO_USER_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_BROADER_REVIEW_SCORE_USER_ID" ON "app_bcat"."BCAT_BROADER_REVIEW_SCORE" ("USER_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID" ON "app_bcat"."BCAT_BROADER_REVIEW_SCORE" ("APPLICATION_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_COMMENT_USER_ID" ON "app_bcat"."BCAT_COMMENT" ("USER_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_COMMENT_APPLICATION_ID" ON "app_bcat"."BCAT_COMMENT" ("APPLICATION_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_WORKSHOP_SCORE_USER_ID" ON "app_bcat"."BCAT_WORKSHOP_SCORE" ("USER_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_WORKSHOP_SCORE_APPLICATION_ID" ON "app_bcat"."BCAT_WORKSHOP_SCORE" ("APPLICATION_ID")`
    );
    await queryRunner.query(
      `CREATE INDEX "IX_BCAT_ATTACHMENT_APPLICATION_ID" ON "app_bcat"."BCAT_ATTACHMENT" ("APPLICATION_ID")`
    );

    // add unique constraints
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" ADD CONSTRAINT "BCAT_USER_GUID_UK" UNIQUE ("USER_GUID")`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" ADD CONSTRAINT "BCAT_USER_NAME_UK" UNIQUE ("USER_NAME")`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" ADD CONSTRAINT "BCAT_DISPLAY_NAME_UK" UNIQUE ("DISPLAY_NAME")`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" ADD CONSTRAINT "BCAT_SUBMISSION_ID_UK" UNIQUE ("SUBMISSION_ID")`
    );

    // add foreign keys
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" ADD CONSTRAINT "FK_BCAT_APPLICATION_FORM_METADATA_ID" FOREIGN KEY ("FORM_METADATA_ID") REFERENCES "app_bcat"."BCAT_FORM_METADATA"("FORM_METADATA_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" ADD CONSTRAINT "FK_BCAT_APPLICATION_ASSIGNED_TO_USER_ID" FOREIGN KEY ("ASSIGNED_TO_USER_ID") REFERENCES "app_bcat"."BCAT_USER"("USER_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" ADD CONSTRAINT "FK_BCAT_APPLICATION_DELETED_BY_USER_ID" FOREIGN KEY ("DELETED_BY_USER_ID") REFERENCES "app_bcat"."BCAT_USER"("USER_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_BROADER_REVIEW_SCORE" ADD CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES "app_bcat"."BCAT_APPLICATION"("APPLICATION_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_BROADER_REVIEW_SCORE" ADD CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES "app_bcat"."BCAT_USER"("USER_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_COMMENT" ADD CONSTRAINT "FK_BCAT_COMMENT_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES "app_bcat"."BCAT_APPLICATION"("APPLICATION_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_COMMENT" ADD CONSTRAINT "FK_BCAT_COMMENT_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES "app_bcat"."BCAT_USER"("USER_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_WORKSHOP_SCORE" ADD CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES "app_bcat"."BCAT_APPLICATION"("APPLICATION_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_WORKSHOP_SCORE" ADD CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES "app_bcat"."BCAT_USER"("USER_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_ATTACHMENT" ADD CONSTRAINT "FK_BCAT_ATTACHMENT_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES "app_bcat"."BCAT_APPLICATION"("APPLICATION_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop tables
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_ATTACHMENT"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_WORKSHOP_SCORE"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_COMMENT"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_BROADER_REVIEW_SCORE"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_APPLICATION"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_USER"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "app_bcat"."BCAT_FORM_METADATA"`);

    // drop indexes
    await queryRunner.query(`DROP INDEX "IX_BCAT_APPLICATION_FORM_METADATA_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_APPLICATION_ASSIGNED_TO_USER_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_BROADER_REVIEW_SCORE_USER_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_COMMENT_USER_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_COMMENT_APPLICATION_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_WORKSHOP_SCORE_USER_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_WORKSHOP_SCORE_APPLICATION_ID"`);
    await queryRunner.query(`DROP INDEX "IX_BCAT_ATTACHMENT_APPLICATION_ID"`);

    //drop unique constraints
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" DROP CONSTRAINT "BCAT_USER_GUID_UK"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" DROP CONSTRAINT "BCAT_USER_NAME_UK"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_USER" DROP CONSTRAINT "BCAT_DISPLAY_NAME_UK"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_bcat"."BCAT_APPLICATION" DROP CONSTRAINT "BCAT_SUBMISSION_ID_UK"`
    );

    // drop fks
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" DROP CONSTRAINT "FK_BCAT_APPLICATION_FORM_METADATA_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" DROP CONSTRAINT "FK_BCAT_APPLICATION_ASSIGNED_TO_USER_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_APPLICATION" DROP CONSTRAINT "FK_BCAT_APPLICATION_DELETED_BY_USER_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_BROADER_REVIEW_SCORE" DROP CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_BROADER_REVIEW_SCORE" DROP CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_USER_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_COMMENT" DROP CONSTRAINT "FK_BCAT_COMMENT_APPLICATION_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_COMMENT" DROP CONSTRAINT "FK_BCAT_COMMENT_USER_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_WORKSHOP_SCORE" DROP CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_APPLICATION_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_WORKSHOP_SCORE" DROP CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_USER_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE ONLY "app_bcat"."BCAT_ATTACHMENT" DROP CONSTRAINT "FK_BCAT_ATTACHMENT_APPLICATION_ID"`
    );
  }
}
