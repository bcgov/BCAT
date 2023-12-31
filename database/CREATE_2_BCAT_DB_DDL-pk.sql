SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;


--
-- Name: BCAT_APPLICATION_TYPE_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_APPLICATION_TYPE"
    ADD CONSTRAINT "BCAT_APPLICATION_TYPE_PK" PRIMARY KEY ("APPLICATION_TYPE_ID");

--
-- Name: BCAT_STATUS_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_STATUS"
    ADD CONSTRAINT "BCAT_STATUS_PK" PRIMARY KEY ("STATUS_ID");

--
-- Name: BCAT_COMPLETION_STATUS_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_COMPLETION_STATUS"
    ADD CONSTRAINT "BCAT_COMPLETION_STATUS_PK" PRIMARY KEY ("COMPLETION_STATUS_ID");

--
-- Name: BCAT_APPLICATION_TYPE_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_APPLICATION_TYPE"
    ADD CONSTRAINT "BCAT_APPLICATION_TYPE_PK" PRIMARY KEY ("APPLICATION_TYPE_ID");

--
-- Name: BCAT_USER_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_USER"
    ADD CONSTRAINT "BCAT_USER_PK" PRIMARY KEY ("USER_ID");

--
-- Name: BCAT_APPLICATION_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_APPLICATION"
    ADD CONSTRAINT "BCAT_APPLICATION_PK" PRIMARY KEY ("APPLICATION_ID");

--
-- Name: BCAT_BROADER_REVIEW_SCORE_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_BROADER_REVIEW_SCORE"
    ADD CONSTRAINT "BCAT_BROADER_REVIEW_SCORE_PK" PRIMARY KEY ("BROADER_REVIEW_SCORE_ID");

--
-- Name: BCAT_COMMENT_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_COMMENT"
    ADD CONSTRAINT "BCAT_COMMENT_PK" PRIMARY KEY ("COMMENT_ID");

--
-- Name: BCAT_WORKSHOP_SCORE_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_WORKSHOP_SCORE"
    ADD CONSTRAINT "BCAT_WORKSHOP_SCORE_PK" PRIMARY KEY ("WORKSHOP_SCORE_ID");

--
-- Name: BCAT_ATTACHMENT_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_ATTACHMENT"
    ADD CONSTRAINT "BCAT_ATTACHMENT_PK" PRIMARY KEY ("ATTACHMENT_ID");

--
-- Name: BCAT_FORM_METADATA_PK; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY app_bcat."BCAT_FORM_METADATA"
    ADD CONSTRAINT "BCAT_FORM_METADATA_PK" PRIMARY KEY ("FORM_METADATA_ID");
