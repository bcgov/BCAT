SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

ALTER TABLE public."BCAT_USER" 
ADD CONSTRAINT "BCAT_USER_GUID_UK" UNIQUE ("USER_GUID");

ALTER TABLE public."BCAT_USER" 
ADD CONSTRAINT "BCAT_USER_NAME_UK" UNIQUE ("USER_NAME");

ALTER TABLE public."BCAT_USER" 
ADD CONSTRAINT "BCAT_DISPLAY_NAME_UK" UNIQUE ("DISPLAY_NAME");


ALTER TABLE public."BCAT_APPLICATION" 
ADD CONSTRAINT "BCAT_SUBMISSION_ID_UK" UNIQUE ("SUBMISSION_ID");
