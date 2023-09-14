-- trdbbcatd -> dev account
-- trdbbcatt -> test account
-- trdbbcatp -> prod account

CREATE USER trdbbcatd;
ALTER USER trdbbcatd WITH ENCRYPTED PASSWORD '<pwd>';
GRANT bcat_application_proxy TO trdbbcatd;