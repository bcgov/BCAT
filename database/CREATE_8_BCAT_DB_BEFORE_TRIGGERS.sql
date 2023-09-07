-- Trigger: bcat_user_br_iu_tr
-- DROP TRIGGER bcat_user_br_iu_tr ON app_bcat."BCAT_USER";
CREATE TRIGGER bcat_user_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_USER"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_application_br_iu_tr
-- DROP TRIGGER bcat_application_br_iu_tr ON app_bcat."BCAT_APPLICATION";
CREATE TRIGGER bcat_application_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_APPLICATION"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_BROADER_review_score_br_iu_tr
-- DROP TRIGGER bcat_BROADER_review_score_br_iu_tr ON app_bcat."BCAT_BROADER_REVIEW_SCORE";
CREATE TRIGGER bcat_broader_review_score_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_BROADER_REVIEW_SCORE"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_comment_br_iu_tr
-- DROP TRIGGER bcat_comment_br_iu_tr ON app_bcat."BCAT_COMMENT";
CREATE TRIGGER bcat_comment_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_COMMENT"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_bcat_workshop_score_br_iu_tr
-- DROP TRIGGER bcat_bcat_workshop_score_br_iu_tr ON app_bcat."BCAT_BCAT_WORKSHOP_SCORE";
CREATE TRIGGER bcat_bcat_workshop_score_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_WORKSHOP_SCORE"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_attachment_br_iu_tr
-- DROP TRIGGER bcat_attachment_br_iu_tr ON app_bcat."BCAT_ATTACHMENT";
CREATE TRIGGER bcat_attachment_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_ATTACHMENT"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_form_metadata_br_iu_tr
-- DROP TRIGGER bcat_form_metadata_br_iu_tr ON app_bcat."BCAT_FORM_METADATA";
CREATE TRIGGER bcat_form_metadata_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_FORM_METADATA"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_status_br_iu_tr
-- DROP TRIGGER bcat_status_br_iu_tr ON app_bcat."BCAT_STATUS";
CREATE TRIGGER bcat_status_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_STATUS"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();

-- Trigger: bcat_completion_status_br_iu_tr
-- DROP TRIGGER bcat_completion_status_br_iu_tr ON app_bcat."BCAT_COMPLETION_STATUS";
CREATE TRIGGER bcat_completion_status_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_COMPLETION_STATUS"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();


-- Trigger: bcat_application_type_br_iu_tr
-- DROP TRIGGER bcat_application_type_br_iu_tr ON app_bcat."BCAT_APPLICATION_TYPE";
CREATE TRIGGER bcat_application_type_br_iu_tr
    BEFORE INSERT OR UPDATE 
    ON app_bcat."BCAT_APPLICATION_TYPE"
    FOR EACH ROW
    EXECUTE PROCEDURE app_bcat.bcat_validate_init_audit_cols();
