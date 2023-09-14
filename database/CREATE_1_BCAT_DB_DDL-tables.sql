SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

CREATE SCHEMA IF NOT EXISTS app_bcat;

SET default_tablespace = '';

SET default_with_oids = false;

-- Create tables.
-- CREATE TABLE app_bcat."BCAT_USER"
-- CREATE TABLE app_bcat."BCAT_APPLICATION"
-- CREATE TABLE app_bcat."BCAT_BROADER_REVIEW_SCORE"
-- CREATE TABLE app_bcat."BCAT_COMMENT"
-- CREATE TABLE app_bcat."BCAT_WORKSHOP_SCORE"
-- CREATE TABLE app_bcat."BCAT_ATTACHMENT"
-- CREATE TABLE app_bcat."BCAT_FORM_METADATA"


--
-- Name: BCAT_APPLICATION_TYPE; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_APPLICATION_TYPE" (
    "APPLICATION_TYPE_ID" integer NOT NULL, 
    "NAME" character varying(20),
    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_STATUS; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_STATUS" (
    "STATUS_ID" integer NOT NULL, 
    "NAME" character varying(10),
    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_COMPLETION_STATUS; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_COMPLETION_STATUS" (
    "COMPLETION_STATUS_ID" integer NOT NULL, 
    "NAME" character varying(12),
    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_COMPLETION_STATUS; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_APPLICATION_TYPE" (
    "APPLICATION_TYPE_ID" integer NOT NULL, 
    "NAME" character varying(50),
    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_USER_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_USER_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: BCAT_USER; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_USER" (
    "USER_ID" integer DEFAULT nextval('app_bcat."BCAT_USER_ID_seq"'::regclass) NOT NULL, 
    "USER_NAME" character varying(100),
    "DISPLAY_NAME" character varying(200),
	"USER_GUID" UUID NOT NULL,  -- SiteMinder user guid 
	"IS_AUTHORIZED" boolean NOT NULL,
	"IS_ADMIN" boolean NOT NULL,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);


--
-- Name: BCAT_APPLICATION_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_APPLICATION_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_APPLICATION; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_APPLICATION" (
    "APPLICATION_ID" integer DEFAULT nextval('app_bcat."BCAT_APPLICATION_ID_seq"'::regclass) NOT NULL, 
    "FORM_METADATA_ID" integer NOT NULL, 
    "ASSIGNED_TO_USER_ID" integer NULL,  -- user_id

    "SUBMISSION_ID" UUID NOT NULL,
    "SUBMISSION" JSONB NOT NULL,
    "CONFIRMATION_ID" character varying(30) NOT NULL,

    --"APPLICATION_TYPE" character varying(100),
    "APPLICATION_TYPE_ID" integer NOT NULL,
    "APPLICANT_NAME" character varying(300),
    "PROJECT_TITLE" character varying(100) NOT NULL,
    "TOTAL_ESTIMATED_COST" money,
    "ASKS" money,
    "STATUS_ID" integer NOT NULL DEFAULT 1,
    --"STATUS" character varying(100) NOT NULL DEFAULT 'RECEIVED',
    "DELETED_AT" timestamp without time zone NULL,
    "DELETED_BY_USER_ID" integer NULL,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_BROADER_REVIEW_SCORE_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_BROADER_REVIEW_SCORE_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_BROADER_REVIEW_SCORE; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_BROADER_REVIEW_SCORE" (
    "BROADER_REVIEW_SCORE_ID" integer DEFAULT nextval('app_bcat."BCAT_BROADER_REVIEW_SCORE_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL, 

    "DATA" JSONB,
    "FINAL_SCORE" integer,
    "OVERALL_COMMENTS" character varying(2000),
    "COMPLETION_STATUS_ID" integer NULL,
    --"COMPLETION_STATUS"character varying(30),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);


--
-- Name: BCAT_COMMENT_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_COMMENT_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_COMMENT; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_COMMENT" (
    "COMMENT_ID" integer DEFAULT nextval('app_bcat."BCAT_COMMENT_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL,

    "OVERALL_COMMENTS"character varying(2000),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_WORKSHOP_SCORE_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_WORKSHOP_SCORE_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_WORKSHOP_SCORE; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_WORKSHOP_SCORE" (
    "WORKSHOP_SCORE_ID" integer DEFAULT nextval('app_bcat."BCAT_WORKSHOP_SCORE_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL, 

    "DATA" JSONB,
    "FINAL_SCORE" integer,
    "OVERALL_COMMENTS" character varying(2000),
    "COMPLETION_STATUS_ID" integer NULL,
    --"COMPLETION_STATUS"character varying(30),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_ATTACHMENT_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_ATTACHMENT_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_ATTACHMENT; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_ATTACHMENT" (
    "ATTACHMENT_ID" integer DEFAULT nextval('app_bcat."BCAT_ATTACHMENT_ID_seq"'::regclass) NOT NULL, 
    "APPLICATION_ID" integer NOT NULL,
    "ATTACHMENT_CHEFS_UUID" uuid,

    "DATA" BYTEA,
    "URL" character varying(200) NOT NULL,
    "ORIGINAL_NAME" character varying(200) NOT NULL,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_FORM_METADATA_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE app_bcat."BCAT_FORM_METADATA_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_FORM_METADATA; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE app_bcat."BCAT_FORM_METADATA" (
    "FORM_METADATA_ID" integer DEFAULT nextval('app_bcat."BCAT_FORM_METADATA_ID_seq"'::regclass) NOT NULL, 
    
    "NAME" character varying(200) NOT NULL,
    "DESCRIPTION" character varying(2000) NOT NULL,
    "CHEFS_FORM_ID" UUID NOT NULL, -- Guid
    "VERSION_SCHEMA" JSONB NOT NULL, -- Form configuration
    "VERSION_ID" UUID NOT NULL,  -- guid new table
    "ACTIVE" boolean NOT NULL DEFAULT TRUE,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" integer,    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" integer,
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT now(),
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

