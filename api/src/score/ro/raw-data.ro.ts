import { Application } from '@/application/application.entity';

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Confirmation ID', value: 'confirmationId' },
    { label: 'Application Name', value: 'applicantName' },
    { label: 'Application Type', value: 'applicationType' },
    { label: 'Project Title', value: 'projectTitle' },
    { label: 'Estimated Project Cost', value: 'totalEstimatedCost' },
    { label: 'Raw Ask', value: 'asks' },
    { label: 'Assigned To', value: 'assignedTo' },
    { label: 'Last Update', value: 'lastUpdated' },
    { label: 'Status', value: 'status' },
  ],
};

export interface RawData {
  sheet: string;
  columns: { label: string; value: string }[];

  content: {
    confirmationId: string;
    applicantName: string;
    applicationType: string;
    projectTitle: string;
    totalEstimatedCost: string;
    asks: string;
    assignedTo: string;
    lastUpdated: string;
    status: string;
  }[];
}

export class RawDataRo {
  result: RawData[];
  constructor(data: Application[]) {
    this.result = [{ ...roHeaders, ...this.convertApplicationToContent(data) }];
  }
  convertApplicationToContent(data: Application[]) {
    const content = data.map((item: Application) => {
      return {
        confirmationId: item.confirmationId,
        applicantName: item.applicantName,
        applicationType: item.applicationType,
        projectTitle: item.projectTitle,
        totalEstimatedCost: item.totalEstimatedCost,
        asks: item.asks,
        assignedTo: item?.assignedTo?.displayName || '-',
        lastUpdated: item.updatedAt.toString(),
        status: item.status,
      };
    });
    return { content };
  }
}
