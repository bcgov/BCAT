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


SET default_tablespace = '';

SET default_with_oids = false;

-- Create tables.
-- CREATE TABLE public."BCAT_USER"
-- CREATE TABLE public."BCAT_APPLICATION"
-- CREATE TABLE public."BCAT_BROADER_REVIEW_SCORE"
-- CREATE TABLE public."BCAT_COMMENT"
-- CREATE TABLE public."BCAT_WORKSHOP_SCORE"
-- CREATE TABLE public."BCAT_ATTACHMENT"
-- CREATE TABLE public."BCAT_FORM_METADATA"


--
-- Name: BCAT_USER_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_USER_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: BCAT_USER; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_USER" (
    "USER_ID" integer DEFAULT nextval('public."BCAT_USER_ID_seq"'::regclass) NOT NULL, 
    "USER_NAME" character varying(100),
    "DISPLAY_NAME" character varying(200),
	"USER_GUID" UUID NOT NULL,  -- SiteMinder user guid 
	"IS_AUTHORIZED" boolean NOT NULL,
	"IS_ADMIN" boolean NOT NULL,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);


--
-- Name: BCAT_APPLICATION_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_APPLICATION_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_APPLICATION; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_APPLICATION" (
    "APPLICATION_ID" integer DEFAULT nextval('public."BCAT_APPLICATION_ID_seq"'::regclass) NOT NULL, 
    --"SUBMISSION_ID" integer NOT NULL,
    "FORM_METADATA_ID" integer NOT NULL, 
    "ASSIGNED_TO_USER_ID" integer NOT NULL,  -- user_id

    "SUBMISSION_ID" UUID NOT NULL,
    "SUBMISSION" JSONB NOT NULL,

    --"APPLICATION_ID_GUID" UUID NOT NULL, 
    --"CONFIRMATION_ID" character varying(200) NOT NULL,  -- ?
    "FACILITY_NAME" character varying(200) NOT NULL,
    "PROJECT_TITLE" character varying(100) NOT NULL,
    "TOTAL_ESTIMATED_COST" money,
    "ASKS" money,
    "STATUS" character varying(100) NOT NULL,
    --"LAST_UPDATED_BY_ID" character varying(36) NOT NULL,  -- ?
    "DELETED_AT" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DELETED_BY_USER_ID" integer,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_BROADER_REVIEW_SCORE_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_BROADER_REVIEW_SCORE_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_BROADER_REVIEW_SCORE; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_BROADER_REVIEW_SCORE" (
    "BROADER_REVIEW_SCORE_ID" integer DEFAULT nextval('public."BCAT_BROADER_REVIEW_SCORE_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL, 

    "DATA" JSONB,
    "FINAL_SCORE" integer,
    "OVERALL_COMMENTS"character varying(2000),
    "COMPLETION_STATUS"character varying(30),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);


--
-- Name: BCAT_COMMENT_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_COMMENT_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_COMMENT; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_COMMENT" (
    "COMMENT_ID" integer DEFAULT nextval('public."BCAT_COMMENT_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL,

    "OVERALL_COMMENTS"character varying(2000),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_WORKSHOP_SCORE_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_WORKSHOP_SCORE_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_WORKSHOP_SCORE; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_WORKSHOP_SCORE" (
    "WORKSHOP_SCORE_ID" integer DEFAULT nextval('public."BCAT_WORKSHOP_SCORE_ID_seq"'::regclass) NOT NULL, 
    "USER_ID" integer NOT NULL, 
    "APPLICATION_ID" integer NOT NULL, 

    "DATA" JSONB,
    "FINAL_SCORE" integer,
    "OVERALL_COMMENTS"character varying(2000),
    "COMPLETION_STATUS"character varying(30),

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_ATTACHMENT_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_ATTACHMENT_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_ATTACHMENT; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_ATTACHMENT" (
    "ATTACHMENT_ID" integer DEFAULT nextval('public."BCAT_ATTACHMENT_ID_seq"'::regclass) NOT NULL, 
    "APPLICATION_ID" integer NOT NULL,
    --"ATTACHMENT_ID_GUID" UUID NOT NULL,
    "ATTACHMENT_ID_NAME" character varying(100) NOT NULL,

    "DATA" BYTEA,
    "URL" character varying(200) NOT NULL,
    "ORIGINAL_NAME" character varying(200) NOT NULL,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

--
-- Name: BCAT_FORM_METADATA_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public."BCAT_FORM_METADATA_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: BCAT_FORM_METADATA; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public."BCAT_FORM_METADATA" (
    "FORM_METADATA_ID" integer DEFAULT nextval('public."BCAT_FORM_METADATA_ID_seq"'::regclass) NOT NULL, 
    --"ATTACHMENT_ID_GUID" UUID NOT NULL,
    --"FORM_METADATA_ID_NAME" character varying(100) NOT NULL,
    
    "NAME" character varying(200) NOT NULL,
    "DESCRIPTION" character varying(2000) NOT NULL,
    "CHEFS_FORM_ID" UUID NOT NULL, -- Guid
    "VERSION_SCHEMA" JSONB NOT NULL, -- Form configuration
    "VERSION_ID" UUID NOT NULL,  -- guid new table
    "ACTIVE" boolean NOT NULL DEFAULT TRUE,

    "CONCURRENCY_CONTROL_NUMBER" integer NOT NULL DEFAULT 0,
	"APP_CREATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",    
	"APP_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,    
    "APP_LAST_UPDATE_USER_GUID" character varying(36) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
    "APP_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,		
	"DB_AUDIT_CREATE_USER_ID" character varying(30) COLLATE pg_catalog."default",
	"DB_AUDIT_CREATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
	"DB_AUDIT_LAST_UPDATE_TIMESTAMP" timestamp without time zone NOT NULL DEFAULT '0001-01-01 00:00:00'::timestamp without time zone,
    "DB_AUDIT_LAST_UPDATE_USER_ID" character varying(30) COLLATE pg_catalog."default"
);

