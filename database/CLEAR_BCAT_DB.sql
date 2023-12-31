SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;


DROP TABLE IF EXISTS app_bcat."BCAT_ATTACHMENT";
DROP TABLE IF EXISTS app_bcat."BCAT_WORKSHOP_SCORE";
DROP TABLE IF EXISTS app_bcat."BCAT_COMMENT";
DROP TABLE IF EXISTS app_bcat."BCAT_BROADER_REVIEW_SCORE";
DROP TABLE IF EXISTS app_bcat."BCAT_APPLICATION";
DROP TABLE IF EXISTS app_bcat."BCAT_FORM_METADATA";
DROP TABLE IF EXISTS app_bcat."BCAT_STATUS";
DROP TABLE IF EXISTS app_bcat."BCAT_COMPLETION_STATUS";
DROP TABLE IF EXISTS app_bcat."BCAT_USER";

DROP SEQUENCE IF EXISTS app_bcat."BCAT_FORM_METADATA_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_ATTACHMENT_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_WORKSHOP_SCORE_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_COMMENT_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_BROADER_REVIEW_SCORE_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_APPLICATION_ID_seq";
DROP SEQUENCE IF EXISTS app_bcat."BCAT_USER_ID_seq";

DROP FUNCTION IF EXISTS app_bcat.bcat_validate_init_audit_cols;

ALTER DATABASE bcat OWNER TO postgres;

DROP USER IF EXISTS trdbbcatd;
DROP ROLE IF EXISTS bcat_application_proxy;

