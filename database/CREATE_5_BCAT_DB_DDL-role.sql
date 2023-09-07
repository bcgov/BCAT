SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

CREATE ROLE bcat_application_proxy;

ALTER ROLE bcat_application_proxy WITH createdb;

GRANT ALL ON SCHEMA app_bcat TO PUBLIC;

GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_USER_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_APPLICATION_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_BROADER_REVIEW_SCORE_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_COMMENT_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_WORKSHOP_SCORE_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_ATTACHMENT_ID_seq" TO bcat_application_proxy;
GRANT ALL PRIVILEGES ON SEQUENCE app_bcat."BCAT_FORM_METADATA_ID_seq" TO bcat_application_proxy;

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_USER" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_APPLICATION" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_BROADER_REVIEW_SCORE" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_COMMENT" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_WORKSHOP_SCORE" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_ATTACHMENT" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_FORM_METADATA" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_STATUS" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_COMPLETION_STATUS" TO bcat_application_proxy;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_bcat."BCAT_APPLICATION_TYPE" TO bcat_application_proxy;
