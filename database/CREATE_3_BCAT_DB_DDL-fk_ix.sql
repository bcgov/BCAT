SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;

-- Create foreign keys

--
-- Name: FK_BCAT_APPLICATION_FORM_METADATA_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_APPLICATION"
    ADD CONSTRAINT "FK_BCAT_APPLICATION_FORM_METADATA_ID" FOREIGN KEY ("FORM_METADATA_ID") REFERENCES public."BCAT_FORM_METADATA"("FORM_METADATA_ID");

--
-- Name: FK_BCAT_APPLICATION_ASSIGNED_TO_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_APPLICATION"
    ADD CONSTRAINT "FK_BCAT_APPLICATION_ASSIGNED_TO_USER_ID" FOREIGN KEY ("ASSIGNED_TO_USER_ID") REFERENCES public."BCAT_USER"("USER_ID");

--
-- Name: FK_BCAT_APPLICATION_DELETED_BY_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_APPLICATION"
    ADD CONSTRAINT "FK_BCAT_APPLICATION_DELETED_BY_USER_ID" FOREIGN KEY ("DELETED_BY_USER_ID") REFERENCES public."BCAT_USER"("USER_ID");

--
-- Name: FK_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_BROADER_REVIEW_SCORE"
    ADD CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES public."BCAT_APPLICATION"("APPLICATION_ID");

--
-- Name: FK_BCAT_BROADER_REVIEW_SCORE_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_BROADER_REVIEW_SCORE"
    ADD CONSTRAINT "FK_BCAT_BROADER_REVIEW_SCORE_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES public."BCAT_USER"("USER_ID");

--
-- Name: FK_BCAT_COMMENT_APPLICATION_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_COMMENT"
    ADD CONSTRAINT "FK_BCAT_COMMENT_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES public."BCAT_APPLICATION"("APPLICATION_ID");

--
-- Name: FK_BCAT_COMMENT_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_COMMENT"
    ADD CONSTRAINT "FK_BCAT_COMMENT_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES public."BCAT_USER"("USER_ID");

--
-- Name: FK_BCAT_WORKSHOP_SCORE_APPLICATION_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_WORKSHOP_SCORE"
    ADD CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES public."BCAT_APPLICATION"("APPLICATION_ID");

--
-- Name: FK_BCAT_WORKSHOP_SCORE_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_WORKSHOP_SCORE"
    ADD CONSTRAINT "FK_BCAT_WORKSHOP_SCORE_USER_ID" FOREIGN KEY ("USER_ID") REFERENCES public."BCAT_USER"("USER_ID");

--
-- Name: FK_BCAT_ATTACHMENT_APPLICATION_ID; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public."BCAT_ATTACHMENT"
    ADD CONSTRAINT "FK_BCAT_ATTACHMENT_APPLICATION_ID" FOREIGN KEY ("APPLICATION_ID") REFERENCES public."BCAT_APPLICATION"("APPLICATION_ID");


-- Create indexes

--
-- Name: IX_BCAT_<table name>_<field name>; Type: INDEX; Schema: public; Owner: -
--
--CREATE INDEX "IX_BCAT_<table name>_<field name>" ON public."BCAT_<table name>" USING btree ("<field name>");


--
-- Name: IX_BCAT_APPLICATION_FORM_METADATA_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_APPLICATION_FORM_METADATA_ID" ON public."BCAT_APPLICATION" USING btree ("FORM_METADATA_ID");

--
-- Name: IX_BCAT_APPLICATION_ASSIGNED_TO_USER_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_APPLICATION_ASSIGNED_TO_USER_ID" ON public."BCAT_APPLICATION" USING btree ("ASSIGNED_TO_USER_ID");

--
-- Name: IX_BCAT_BROADER_REVIEW_SCORE_USER_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_BROADER_REVIEW_SCORE_USER_ID" ON public."BCAT_BROADER_REVIEW_SCORE" USING btree ("USER_ID");

--
-- Name: IX_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_BROADER_REVIEW_SCORE_APPLICATION_ID" ON public."BCAT_BROADER_REVIEW_SCORE" USING btree ("APPLICATION_ID");

--
-- Name: IX_BCAT_COMMENT_USER_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_COMMENT_USER_ID" ON public."BCAT_COMMENT" USING btree ("USER_ID");

--
-- Name: IX_BCAT_COMMENT_APPLICATION_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_COMMENT_APPLICATION_ID" ON public."BCAT_COMMENT" USING btree ("APPLICATION_ID");

--
-- Name: IX_BCAT_WORKSHOP_SCORE_USER_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_WORKSHOP_SCORE_USER_ID" ON public."BCAT_WORKSHOP_SCORE" USING btree ("USER_ID");

--
-- Name: IX_BCAT_WORKSHOP_SCORE_APPLICATION_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_WORKSHOP_SCORE_APPLICATION_ID" ON public."BCAT_WORKSHOP_SCORE" USING btree ("APPLICATION_ID");

--
-- Name: IX_BCAT_ATTACHMENT_APPLICATION_ID; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX "IX_BCAT_ATTACHMENT_APPLICATION_ID" ON public."BCAT_ATTACHMENT" USING btree ("APPLICATION_ID");
