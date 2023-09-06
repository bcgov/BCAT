import dayjs from 'dayjs';
import { Application } from '@/application/application.entity';

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Applicant Name', value: 'applicantName' },
    { label: 'Application Type', value: 'applicationType' },
    { label: 'Project Title', value: 'projectTitle' },
    { label: 'Estimated Project Cost', value: 'totalEstimatedCost' },
    { label: 'Raw Ask', value: 'asks' },
    { label: 'Assigned To', value: 'assignedTo' },
    { label: 'Last Update', value: 'lastUpdated' },
    { label: 'Status', value: 'status' },
    { label: 'Confirmation ID', value: 'confirmationId' },
  ],
};

export interface RawData {
  sheet: string;
  columns: { label: string; value: string }[];

  content: {
    applicantName: string;
    applicationType: string;
    projectTitle: string;
    totalEstimatedCost: string;
    asks: string;
    assignedTo: string;
    lastUpdated: string;
    status: string;
    confirmationId: string;
  }[];
}

export class RawDataRo {
  result: RawData[];
  constructor(data: Application[]) {
    this.result = [{ ...roHeaders, ...this.convertApplicationToContent(data) }];
  }
  convertApplicationToContent(data: Application[]) {
    const content = data.map((item: Application) => {
      const formattedDate = dayjs(item.updatedAt).isValid()
        ? dayjs(item.updatedAt).format('YYYY-MM-DD')
        : '-';

      return {
        applicantName: item.applicantName,
        applicationType: item.applicationType,
        projectTitle: item.projectTitle,
        totalEstimatedCost: item.totalEstimatedCost,
        asks: item.asks,
        assignedTo: item?.assignedTo?.displayName || '-',
        lastUpdated: formattedDate,
        status: item.status,
        confirmationId: item.confirmationId,
        lastUpdated: item.updatedAt.toString(),
        status: item.status?.name || '-',
      };
    });
    return { content };
  }
}
