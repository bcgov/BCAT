--
-- FUNCTION: public.bcat_validate_init_audit_cols()
--
CREATE FUNCTION public.bcat_validate_init_audit_cols() 
    RETURNS trigger
    LANGUAGE 'plpgsql'
    VOLATILE NOT LEAKPROOF
AS $BODY$

	DECLARE
    l_current_timestamp timestamp;
	BEGIN
    	l_current_timestamp := current_timestamp;
    	IF(TG_OP = 'INSERT') THEN
            NEW."DB_AUDIT_CREATE_TIMESTAMP" := l_current_timestamp;
            NEW."DB_AUDIT_CREATE_USER_ID" := current_user;
			NEW."DB_AUDIT_LAST_UPDATE_TIMESTAMP" := l_current_timestamp;
            NEW."DB_AUDIT_LAST_UPDATE_USER_ID" := current_user;
           	RETURN NEW;
        ELSIF (TG_OP = 'UPDATE') THEN
         	IF (OLD."DB_AUDIT_CREATE_USER_ID" <> NEW."DB_AUDIT_CREATE_USER_ID") THEN
            	RAISE 'DB_AUDIT_CREATE_USER_ID CANNOT BE MODIFIED DURING AN UPDATE %', NEW."DB_AUDIT_CREATE_USER_ID" USING ERRCODE = '20010';
            END IF;
        	IF (OLD."DB_AUDIT_CREATE_TIMESTAMP" <> NEW."DB_AUDIT_CREATE_TIMESTAMP") THEN
            	RAISE 'DB_AUDIT_CREATE_TIMESTAMP CANNOT BE MODIFIED DURING AN UPDATE %', NEW."DB_AUDIT_CREATE_TIMESTAMP" USING ERRCODE = '20020';
            END IF;
            IF (OLD."APP_CREATE_USER_ID" <> NEW."APP_CREATE_USER_ID") THEN
            	RAISE 'APP_CREATE_USER_ID CANNOT BE MODIFIED DURING AN UPDATE %', NEW."APP_CREATE_USER_ID" USING ERRCODE = '20140';
            END IF;
        	IF (OLD."APP_CREATE_TIMESTAMP" <> NEW."APP_CREATE_TIMESTAMP") THEN
            	RAISE 'APP_CREATE_TIMESTAMP CANNOT BE MODIFIED DURING AN UPDATE %', NEW."APP_CREATE_TIMESTAMP" USING ERRCODE = '20150';
            END IF;
            IF (NEW."APP_CREATE_USER_GUID" <> OLD."APP_CREATE_USER_GUID")THEN
            	RAISE 'APP_CREATE_USER_GUID CANNOT BE MODIFIED DURING AN UPDATE %', NEW."APP_CREATE_USER_GUID" USING ERRCODE = '20160';
            END IF;
            IF (NEW."CONCURRENCY_CONTROL_NUMBER" <> OLD."CONCURRENCY_CONTROL_NUMBER"+1) THEN
            	RAISE 'Concurrency Failure %', NEW."CONCURRENCY_CONTROL_NUMBER" USING ERRCODE = '20180';
            END IF;
            NEW."DB_AUDIT_LAST_UPDATE_TIMESTAMP" := l_current_timestamp;
            NEW."DB_AUDIT_LAST_UPDATE_USER_ID" := current_user;
           
            RETURN NEW;
         END IF;     
   	END;

$BODY$;

ALTER FUNCTION public.bcat_validate_init_audit_cols()
    OWNER TO "postgres";
