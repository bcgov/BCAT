import { ViewEntity, ViewColumn } from 'typeorm';
import { Application } from './application.entity';

@ViewEntity({
  name: 'v_bcat_application',
  expression: `
    create or replace view v_bcat_application as
    select 
      ba."SUBMISSION" -> 's1Container' ->> 's1FundingYear' as funding_year,
      *
    from 
        "BCAT_APPLICATION" ba 
  `,
})
export class ApplicationView extends Application {
  @ViewColumn({ name: 'funding_year' })
  fundingYear: string;
}
