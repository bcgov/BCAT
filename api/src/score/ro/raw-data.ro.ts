import dayjs from 'dayjs';
import { Application } from '../../application/application.entity';
import { ApplicationType } from '../../common/constants';

// { label: 'Withdrawn / Cancelled', value: 'emptyVal' },

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Funding Year', value: 'fundingYear' },
    { label: 'Electoral District', value: 'emptyVal' },
    { label: 'Regional District', value: 'emptyVal' },
    { label: 'Economic Development Region', value: 'emptyVal' },
    { label: 'Applicant Name', value: 'applicantName' },
    { label: 'Applicant Type', value: 'applicantType' },
    { label: 'Indigenous Government', value: 'indigenousGovernment' },
    { label: 'Population', value: 'population', format: '#,##0' },
    { label: 'CGA', value: 'emptyVal' },
    { label: 'Application Type', value: 'applicationType' },
    { label: 'Project Title', value: 'projectTitle' },
    { label: 'Project Description', value: 'projectDescription' },
    { label: 'Project Type', value: 'emptyVal' },
    { label: 'Eligibility', value: 'eligibility' },
    { label: 'Project Length', value: 'emptyVal' },
    { label: 'Latitude Start', value: 'latitudeStart' },
    { label: 'Latitude End', value: 'latitudeEnd' },
    { label: 'Longitude Start', value: 'longitudeStart' },
    { label: 'Longitude End', value: 'longitudeEnd' },
    { label: 'Program', value: 'program' },
    { label: 'Estimated Project Cost', value: 'totalEstimatedCost', format: '$#,##0.00' },
    {
      label: 'Total Eligible Project Cost',
      value: 'totalEligibleProjectCost',
      format: '$#,##0.00',
    },
    { label: 'Raw Ask', value: 'asks', format: '$#,##0.00' },
    { label: 'Assigned To', value: 'assignedTo' },
    { label: 'Last Update', value: 'lastUpdated' },
    { label: 'Status', value: 'status' },
    { label: 'Confirmation ID', value: 'confirmationId' },
    { label: 'Workshop Score', value: 'workshopScore' },
    { label: 'Total Actual Payment', value: 'emptyVal', format: '$#,##0.00' },
    { label: 'Project Open', value: 'emptyVal' },
  ],
};

const usageCountHeaders = {
  sheet: 'Usage Count Data',
  columns: [
    { label: 'Municipality', value: 'municipality' },
    { label: 'Project Name', value: 'projectName' },
    { label: 'Funding Year', value: 'fundingYear' },
    { label: 'Usage Count - Date', value: 'usageCountDate' },
    { label: 'Usage Count - Time', value: 'usageCountTime' },
    { label: 'Usage Count - Location', value: 'usageCountLocation' },
    { label: 'Usage Count - Pedestrian Count', value: 'usageCountPedestrian' },
    { label: 'Usage Count - Bicycle Count', value: 'usageCountBicycle' },
    { label: 'Usage Count - Other', value: 'usageCountOther' },
  ],
};

interface RawContent {
  applicantName: string;
  applicantType: string;
  applicationType: string;
  asks: string;
  assignedTo: string;
  confirmationId: string;
  eligibility: string;
  emptyVal: string;
  fundingYear: string;
  indigenousGovernment: string;
  lastUpdated: string;
  latitudeEnd: string;
  latitudeStart: string;
  longitudeEnd: string;
  longitudeStart: string;
  population: string;
  program: string;
  projectDescription: string;
  projectTitle: string;
  status: string;
  totalEstimatedCost: string;
  workshopScore: string;
}

interface UsageCountContent {
  fundingYear: string;
  municipality: string;
  projectName: string;
  usageCountDate: string;
  usageCountTime: string;
  usageCountLocation: string;
  usageCountPedestrian: string;
  usageCountBicycle: string;
  usageCountOther: string;
}

export interface RawData {
  sheet: string;
  columns: { label: string; value: string; format?: string }[];
  content: any[];
}

export class RawDataRo {
  result: RawData[];
  constructor(data: Application[]) {
    this.result = [
      { ...roHeaders, content: this.convertApplicationToContent(data) },
      { ...usageCountHeaders, content: this.convertUsageCountToContent(data) },
    ];
  }

  convertApplicationToContent(data: Application[]): RawContent[] {
    const NO_VALUE = '-';

    const formatDate = (itemDate: any) => {
      return dayjs(itemDate).isValid() ? dayjs(itemDate).format('YYYY-MM-DD') : NO_VALUE;
    };

    const checkIfItemHasWorkshopScore = (item: any) => {
      return item.workshopScores && item.workshopScores.length > 0;
    };

    const getFundingYear = (signedDate: any) => {
      if (!signedDate) return NO_VALUE;
      return `${dayjs(signedDate).format('YY')}/${dayjs(signedDate).add(1, 'year').format('YY')}`;
    };

    const checkGovernmentApplicant = (primaryApplicant: string, secondaryApplicant: string) => {
      const YES = 'Y';
      const NO = 'N';
      const NA = '-';

      if (!primaryApplicant) return NA;

      return primaryApplicant.includes('indigenous') || secondaryApplicant?.includes('indigenous')
        ? YES
        : NO;
    };

    const addScores = (array: any) => {
      let sum = 0;
      array.forEach((item: any) => {
        if (Number.isInteger(item)) {
          sum += Number(item);
        }
      });
      return sum.toString();
    };

    const content = data.map((item: Application) => {
      const submission = item.submission || {};

      return {
        eligibility: checkIfItemHasWorkshopScore(item)
          ? item.workshopScores[0].data?.eligibilityScore
          : NO_VALUE,
        fundingYear: getFundingYear(submission?.s10Container?.s10ProjectMangerApproverDate),
        applicantName: item.applicantName,
        indigenousGovernment: checkGovernmentApplicant(
          submission.s1Container?.s1GovernmentType,
          submission.s1Container?.s1SecondaryGovernmentType
        ),
        applicationType: item.applicationType?.name || NO_VALUE,
        applicantType: submission.s1Container?.s1GovernmentType || NO_VALUE,
        population:
          submission.s1Container?.s1PrimaryCommunityPopulation ||
          submission.s1Container?.s1CommunityPopulation,
        projectDescription:
          submission.s5Container?.s5ProjectInformation ||
          submission.s3Container?.s3DescriptionHighLevelScopeOutline ||
          NO_VALUE,
        latitudeStart: submission.s5Container?.s6ProjectStartLatitude,
        latitudeEnd: submission.s5Container?.s6ProjectEndLatitude,
        longitudeStart: submission.s5Container?.s6ProjectStartLongitude,
        longitudeEnd: submission.s5Container?.s6ProjectEndLongitude,
        program: 'AT',
        totalEligibleProjectCost: submission.s8Container?.s8TotalEligibleProjectCost,
        workshopScore: checkIfItemHasWorkshopScore(item)
          ? addScores(Object.values(item.workshopScores[0].data))
          : NO_VALUE,
        asks: item.asks,
        assignedTo: item?.assignedTo?.displayName || NO_VALUE,
        confirmationId: item.confirmationId,
        lastUpdated: formatDate(item.updatedAt),
        projectTitle: item.projectTitle,
        status: item.status?.name || NO_VALUE,
        totalEstimatedCost: item.totalEstimatedCost,
        emptyVal: '',
      };
    });

    return content;
  }

  convertUsageCountToContent(data: Application[]): UsageCountContent[] {
    const NO_VALUE = '-';
    const content = [];

    const formatDate = (itemDate: any) => {
      return dayjs(itemDate).isValid() ? dayjs(itemDate).format('YYYY-MM-DD') : NO_VALUE;
    };

    const getFundingYear = (signedDate: any) => {
      if (!signedDate) return NO_VALUE;
      return `${dayjs(signedDate).format('YY')}/${dayjs(signedDate).add(1, 'year').format('YY')}`;
    };

    for (const item of data) {
      if (item.applicationType?.name === ApplicationType.NETWORK_FORM) continue;

      const submission = item.submission || {};
      const usageCountGrid = submission.s5Container?.s5UsageCountFormGrid;

      if (!usageCountGrid) {
        const newItem = {
          municipality: submission.s1Container?.s1GovernmentType || NO_VALUE,
          projectName:
            submission.s4Container?.s4ProjectTitle ||
            submission.s3Container?.s3ProjectTitle ||
            NO_VALUE,
          fundingYear: getFundingYear(
            submission.s10Container?.s10ProjectMangerApproverDate ||
              submission.s11Container?.s11ProjectMangerApproverDate
          ),
          usageCountDate: NO_VALUE,
          usageCountTime: NO_VALUE,
          usageCountLocation: NO_VALUE,
          usageCountPedestrian: NO_VALUE,
          usageCountBicycle: NO_VALUE,
          usageCountOther: NO_VALUE,
        };

        content.push(newItem);
        continue;
      }

      usageCountGrid.forEach((row: any) => {
        content.push({
          municipality: submission.s1Container?.s1GovernmentType || NO_VALUE,
          projectName:
            submission.s4Container?.s4ProjectTitle ||
            submission.s3Container?.s3ProjectTitle ||
            NO_VALUE,
          fundingYear: getFundingYear(
            submission.s10Container?.s10ProjectMangerApproverDate ||
              submission.s11Container?.s11ProjectMangerApproverDate
          ),
          usageCountDate: formatDate(row.dateCell),
          usageCountTime: row.countPeriodCell || NO_VALUE,
          usageCountLocation: row.stationLocationCell || NO_VALUE,
          usageCountPedestrian: row.pedestrianCell,
          usageCountBicycle: row.bicycleCell,
          usageCountOther: row.otherCell,
        });
      });
    }

    return content;
  }
}
