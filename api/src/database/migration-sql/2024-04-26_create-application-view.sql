-- Up --

create or replace view v_bcat_application as
select 
	 ba."SUBMISSION" -> 's1Container' ->> 's1FundingYear' as funding_year,
	 *
from 
  	"BCAT_APPLICATION" ba;

-- Down --
DROP VIEW IF EXISTS v_bcat_application;