SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;


COMMENT ON SEQUENCE app_bcat."BCAT_USER_ID_seq" IS 'SEQUENCE for BCAT_USER.USER_ID';

--
-- Name: BCAT_USER; Type: TABLE; Schema: public; Owner: -
--
--CREATE TABLE app_bcat."BCAT_USER" (
COMMENT ON TABLE app_bcat."BCAT_USER" IS 'The table contains information about users accessing BCAT app';

COMMENT ON COLUMN app_bcat."BCAT_USER"."USER_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."USER_NAME" IS 'User IDIR name.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."DISPLAY_NAME" IS 'Full name of a user.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."USER_GUID" IS 'User keykloak GUID.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."IS_AUTHORIZED" IS 'If user allowed to access BCAT app.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."IS_ADMIN" IS 'If user has admin rights.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_USER"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';


COMMENT ON SEQUENCE app_bcat."BCAT_APPLICATION_ID_seq" IS 'SEQUENCE for BCAT_APPLICATION.APPLICATION_ID';

--
-- Name: BCAT_APPLICATION; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_APPLICATION" IS 'The table contains information about data submitted in CHEFS';

COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APPLICATION_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."FORM_METADATA_ID" IS 'Id of a form version in which this attachment was submitted.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."ASSIGNED_TO_USER_ID" IS 'Id of assigned evaluator, if applicable.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."SUBMISSION_ID" IS 'Id of submitted application in CHEFS.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."SUBMISSION" IS 'Submission data that includes all fields with their values.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."CONFIRMATION_ID" IS 'Submission confirmation id from CHEFS';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APPLICATION_TYPE_ID" IS 'Reference to type of application form in the BCAT_APPLICATION_TYPE table.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APPLICANT_NAME" IS 'Legal name of the government applicant who submitted application.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."PROJECT_TITLE" IS 'Title of a project for which this application was filed.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."TOTAL_ESTIMATED_COST" IS 'Total cost of a project.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."ASKS" IS 'Grant ask for this project.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."STATUS_ID" IS 'Reference to status in the BCAT_STATUS table.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DELETED_AT" IS 'When this application was deleted, if applicable.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DELETED_BY_USER_ID" IS 'Id of a user who deleted this application, if applicable.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON SEQUENCE app_bcat."BCAT_BROADER_REVIEW_SCORE_ID_seq" IS 'SEQUENCE for BCAT_BROADER_REVIEW_SCORE.BROADER_REVIEW_SCORE_ID';

--
-- Name: BCAT_BROADER_REVIEW_SCORE; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_BROADER_REVIEW_SCORE" IS 'The table contains all broader evaluation scores';

COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."BROADER_REVIEW_SCORE_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."USER_ID" IS 'Id of a user who submitted this score.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APPLICATION_ID" IS 'Id of the application to which this score applies.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."DATA" IS 'Contains information about score questions and how many points were assigned to each question.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."FINAL_SCORE" IS 'How many points were assigned in total.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."OVERALL_COMMENTS" IS 'Text message that describes details about this score or application, if applicable.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."COMPLETION_STATUS_ID" IS 'Reference to completion status in the BCAT_COMPLETION_STATUS table.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_BROADER_REVIEW_SCORE"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';


COMMENT ON SEQUENCE app_bcat."BCAT_COMMENT_ID_seq" IS 'SEQUENCE for BCAT_COMMENT.COMMENT_ID';

--
-- Name: BCAT_COMMENT; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_COMMENT" IS 'The table contains comments added for applications';

COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."COMMENT_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."USER_ID" IS 'Id of a user who submitted this comment.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APPLICATION_ID" IS 'Id of the application to which this comment assigned';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."OVERALL_COMMENTS" IS 'Comment message.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_COMMENT"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON SEQUENCE app_bcat."BCAT_WORKSHOP_SCORE_ID_seq" IS 'SEQUENCE for BCAT_WORKSHOP_SCORE.WORKSHOP_SCORE_ID';

--
-- Name: BCAT_WORKSHOP_SCORE; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_WORKSHOP_SCORE" IS 'The table contains all workshop scores.';

COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."WORKSHOP_SCORE_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."USER_ID" IS 'Id of a user who submitted this score.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APPLICATION_ID" IS 'Id of the application to which this score applies.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."DATA" IS 'Contains information about score questions and how many points were assigned to each question.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."FINAL_SCORE" IS 'How many points were assigned in total.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."OVERALL_COMMENTS" IS 'Text message that describes details about this score or application, if applicable.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."COMPLETION_STATUS_ID" IS 'Reference to completion status in the BCAT_COMPLETION_STATUS table.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_WORKSHOP_SCORE"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON SEQUENCE app_bcat."BCAT_ATTACHMENT_ID_seq" IS 'SEQUENCE for BCAT_ATTACHMENT.ATTACHMENT_ID';

--
-- Name: BCAT_ATTACHMENT; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_ATTACHMENT" IS 'The table contains data about attachments linked to the submissions';

COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."ATTACHMENT_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APPLICATION_ID" IS 'Id of a submission to which this attachment was linked.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."ATTACHMENT_CHEFS_UUID" IS 'CHEFS table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."DATA" IS 'The attachment content.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."URL" IS 'The attachment URL in CHEFS.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."ORIGINAL_NAME" IS 'The attachment name with extension.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_ATTACHMENT"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON SEQUENCE app_bcat."BCAT_FORM_METADATA_ID_seq" IS 'SEQUENCE for BCAT_FORM_METADATA.FORM_METADATA_ID';

--
-- Name: BCAT_FORM_METADATA; Type: TABLE; Schema: public; Owner: -
--
COMMENT ON TABLE app_bcat."BCAT_FORM_METADATA" IS 'The table contains information about all versions of CHEFS forms that are being accessed by the application';

COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."FORM_METADATA_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."NAME" IS 'CHEFS form name.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."DESCRIPTION" IS 'Form description.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."CHEFS_FORM_ID" IS 'CHEFS id of a form.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."VERSION_SCHEMA" IS 'What components are included in this version of a form.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."VERSION_ID" IS 'Id of current version for the form.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."ACTIVE" IS 'If this form currently published in CHEFS and ready to accept submissions.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_CREATE_USER_GUID" IS 'Guid of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_CREATE_USER_ID" IS 'Id of a user who created this entry.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_CREATE_TIMESTAMP" IS 'When this entry was created.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_LAST_UPDATE_USER_GUID" IS 'Guid of a user who made changes to this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_LAST_UPDATE_USER_ID" IS 'Id of a user who updated this entry last time.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."APP_LAST_UPDATE_TIMESTAMP" IS 'When this entry was updated last time.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_FORM_METADATA"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON TABLE app_bcat."BCAT_STATUS" IS 'Lookup table for valid statuses.';

COMMENT ON COLUMN app_bcat."BCAT_STATUS"."STATUS_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."NAME" IS 'Status name.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_STATUS"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON TABLE app_bcat."BCAT_COMPLETION_STATUS" IS 'Lookup table for valid completion statuses.';

COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."COMPLETION_STATUS_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."NAME" IS 'Completion status name.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_COMPLETION_STATUS"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';

COMMENT ON TABLE app_bcat."BCAT_APPLICATION_TYPE" IS 'Lookup table for valid application types.';

COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."APPLICATION_TYPE_ID" IS 'The table primary key.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."NAME" IS 'Application type name.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."CONCURRENCY_CONTROL_NUMBER" IS 'Control number to handle concurrent api requests for update.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."DB_AUDIT_CREATE_USER_ID" IS 'The user or proxy account that created the record.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."DB_AUDIT_CREATE_TIMESTAMP" IS 'The date and time the record was created.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."DB_AUDIT_LAST_UPDATE_TIMESTAMP" IS 'The date and time the record was created or last updated.';
COMMENT ON COLUMN app_bcat."BCAT_APPLICATION_TYPE"."DB_AUDIT_LAST_UPDATE_USER_ID" IS 'The user or proxy account that created or last updated the record.';


COMMENT ON ROLE bcat_application_proxy IS 'Database role for BCAT application.';
COMMENT ON FUNCTION app_bcat.bcat_validate_init_audit_cols IS 'Function for DB audit trigger.';

COMMENT ON TRIGGER bcat_user_br_iu_tr ON app_bcat."BCAT_USER" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_application_br_iu_tr ON app_bcat."BCAT_APPLICATION" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_broader_review_score_br_iu_tr ON app_bcat."BCAT_BROADER_REVIEW_SCORE" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_comment_br_iu_tr ON app_bcat."BCAT_COMMENT" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_bcat_workshop_score_br_iu_tr ON app_bcat."BCAT_WORKSHOP_SCORE" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_attachment_br_iu_tr ON app_bcat."BCAT_ATTACHMENT" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_form_metadata_br_iu_tr ON app_bcat."BCAT_FORM_METADATA" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_status_br_iu_tr ON app_bcat."BCAT_STATUS" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_completion_status_br_iu_tr ON app_bcat."BCAT_COMPLETION_STATUS" IS 'The trigger updates audit columns in the table.';
COMMENT ON TRIGGER bcat_application_type_br_iu_tr ON app_bcat."BCAT_APPLICATION_TYPE" IS 'The trigger updates audit columns in the table.';
