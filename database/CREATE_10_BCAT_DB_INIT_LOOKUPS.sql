SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- BCAT_STATUS
--
INSERT INTO app_bcat."BCAT_STATUS"  ("STATUS_ID", "NAME") VALUES (1, 'RECEIVED');
INSERT INTO app_bcat."BCAT_STATUS"  ("STATUS_ID", "NAME") VALUES (2, 'ASSIGNED');
INSERT INTO app_bcat."BCAT_STATUS"  ("STATUS_ID", "NAME") VALUES (3, 'APPROVED');
INSERT INTO app_bcat."BCAT_STATUS"  ("STATUS_ID", "NAME") VALUES (4, 'DENIED');
INSERT INTO app_bcat."BCAT_STATUS"  ("STATUS_ID", "NAME") VALUES (5, 'WORKSHOP');


--
-- BCAT_COMPLETION_STATUS
--
INSERT INTO app_bcat."BCAT_COMPLETION_STATUS"  ("COMPLETION_STATUS_ID", "NAME") VALUES (1, 'IN_PROGRESS');
INSERT INTO app_bcat."BCAT_COMPLETION_STATUS"  ("COMPLETION_STATUS_ID", "NAME") VALUES (2, 'COMPLETE');
