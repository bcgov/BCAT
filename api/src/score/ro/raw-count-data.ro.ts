import dayjs from 'dayjs';
import { Application } from '../../application/application.entity';

const roHeaders = {
  sheet: 'Usage Count Data',
  columns: [
    { label: 'Eligibility', value: 'eligibility' },
  ],
};

export interface RawCountData {
  sheet: string;
  columns: { label: string; value: string }[];

  content: {
    eligibility: string;
  }[];
}

export class RawCountDataRo {
  result: RawCountData[];
  constructor(data: Application[]) {
    this.result = [{ ...roHeaders, ...this.convertApplicationToContent(data) }];
  }

  convertApplicationToContent(data: Application[]) {
    const content = data.map((item: Application) => {
      const NO_VALUE = '-';
      const submission = item.submission || {};

      return {
        eligibility: NO_VALUE,
      };
    });
    return { content };
  }
}
