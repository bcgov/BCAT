import dayjs from 'dayjs';
import { Application } from '../../application/application.entity';
import { ApplicationType } from '../../common/constants';

const roHeaders = {
  sheet: 'Raw Data',
  columns: [
    { label: 'Eligibility', value: 'eligibility' },
    { label: 'Funding Year', value: 'fundingYear' },
    { label: 'Electoral District', value: 'empryVal' },
    { label: 'Regional District', value: 'empryVal' },
    { label: 'Economic Development Region', value: 'empryVal' },
    { label: 'Applicant Type', value: 'applicantName' },
    { label: 'Indigenous Government', value: 'indigenousGovernment' },
    { label: 'Population', value: 'population' },
    { label: 'CGA', value: 'empryVal' },
    { label: 'Project Description', value: 'projectDescription' },
    { label: 'Project Type', value: 'empryVal' },
    { label: 'Project Length', value: 'empryVal' },
    { label: 'Latitude Start', value: 'latitudeStart' },
    { label: 'Latitude End', value: 'latitudeEnd' },
    { label: 'Longitude Start', value: 'longitudeStart' },
    { label: 'Longitude End', value: 'longitudeEnd' },
    { label: 'Program', value: 'program' },
    { label: 'Withdrawn / Cancelled', value: 'empryVal' },
    { label: 'Total Eligible Project Cost', value: 'totalEligibleProjectCost' },
    { label: 'Total Actual Payment', value: 'empryVal' },
    { label: 'Project Open', value: 'empryVal' },
    { label: 'Workshop Score', value: 'workshopScore' },

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

const usageCountHeaders = {
  sheet: 'Usage Count Data',
  columns: [
    { label: 'Municipality', value: 'municipality' },
    { label: 'Project Name', value: 'projectName' },
    { label: 'Funding Year', value: 'fundingYear' },
    { label: 'Usage Count - Date', value: 'usageCountDate' },
  ],
};

interface RawContent {
  applicantName: string;
  applicationType: string;
  eligibility: string;
  empryVal: string;
  fundingYear: string;
  indigenousGovernment: string;
  latitudeEnd: string;
  latitudeStart: string;
  longitudeEnd: string;
  longitudeStart: string;
  population: string;
  program: string;
  projectDescription: string;
  workshopScore: string;

  asks: string;
  assignedTo: string;
  confirmationId: string;
  lastUpdated: string;
  projectTitle: string;
  status: string;
  totalEstimatedCost: string;
}

interface UsageCountContent {
  fundingYear: string;
  municipality: string;
  projectName: string;
  usageCountDate: string;
}

export interface RawData {
  sheet: string;
  columns: { label: string; value: string }[];
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
    const content = data.map((item: Application) => {
      const NO_VALUE = '-';
      const formattedDate = dayjs(item.updatedAt).isValid()
        ? dayjs(item.updatedAt).format('YYYY-MM-DD')
        : NO_VALUE;
      const submission = item.submission || {};
      const hasWorkshopScore = item.workshopScores && item.workshopScores.length > 0;

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

      return {
        eligibility: hasWorkshopScore ? item.workshopScores[0].data?.eligibilityScore : NO_VALUE,
        fundingYear: `${dayjs(submission?.s10Container?.s10ProjectMangerApproverDate).format(
          'YY'
        )}/${dayjs(submission?.s10Container?.s10ProjectMangerApproverDate)
          .add(1, 'year')
          .format('YY')}`,
        applicantName: item.applicantName,
        indigenousGovernment: checkGovernmentApplicant(
          submission.s1Container?.s1GovernmentType,
          submission.s1Container?.s1SecondaryGovernmentType
        ),
        applicationType: item.applicationType?.name || NO_VALUE,
        population:
          submission.s1Container?.s1PrimaryCommunityPopulation ||
          submission.s1Container?.s1CommunityPopulation,
        projectDescription:
          submission.s5Container?.s5ProjectInformation ||
          submission.s3Container?.s3DescriptionHighLevelScopeOutline ||
          NO_VALUE,
        latitudeStart: submission.s5Container?.s6ProjectStartLatitude || NO_VALUE,
        latitudeEnd: submission.s5Container?.s6ProjectEndLatitude || NO_VALUE,
        longitudeStart: submission.s5Container?.s6ProjectStartLongitude || NO_VALUE,
        longitudeEnd: submission.s5Container?.s6ProjectEndLongitude || NO_VALUE,
        program: 'AT',
        totalEligibleProjectCost: submission.s8Container?.s8TotalEligibleProjectCost || NO_VALUE,
        workshopScore: hasWorkshopScore
          ? addScores(Object.values(item.workshopScores[0].data))
          : NO_VALUE,
        asks: item.asks,
        assignedTo: item?.assignedTo?.displayName || NO_VALUE,
        confirmationId: item.confirmationId,
        lastUpdated: formattedDate,
        projectTitle: item.projectTitle,
        status: item.status?.name || NO_VALUE,
        totalEstimatedCost: item.totalEstimatedCost,
        empryVal: '',
      };
    });
    return content;
  }

  convertUsageCountToContent(data: Application[]): UsageCountContent[] {
    const content = data.map((item: Application) => {
      const NO_VALUE = '-';
      const submission = item.submission || {};

      const getProjectName = (applicationType: string) => {
        if (!applicationType) return NO_VALUE;

        return applicationType === ApplicationType.NETWORK_FORM
          ? 'Active Transportation Network Plan'
          : submission.s4Container?.s4ProjectTitle;
      };

      return {
        municipality: submission.s1Container?.s1GovernmentType || NO_VALUE,
        projectName: getProjectName(item.applicationType?.name) || NO_VALUE,
        fundingYear: `${dayjs(submission?.s10Container?.s10ProjectMangerApproverDate).format(
          'YY'
        )}/${dayjs(submission?.s10Container?.s10ProjectMangerApproverDate)
          .add(1, 'year')
          .format('YY')}`,
        usageCountDate: NO_VALUE,
      };
    });
    return content;
  }
}
