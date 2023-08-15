import { ReviewCompletionStatus } from './constants';

export interface ApplicationTableProps {
  applicationType: string;
  asks: string;
  assignedTo: string;
  confirmationId: string;
  projectTitle: string;
  status: string;
  submission: any;
  submissionId: string;
  totalEstimatedCost: string;
  updatedAt: string;
}

export type KeyValuePair = {
  [key: string]: any;
};

export interface BroaderReviewValues {
  overallComments: string;
  finalScore: number;
  projectTypeScore: string;
  projectNeedScore: number;
  projectFundingScore: number;
  pastBcaapFundingScore: number;
  facilityMasterPlanScore: number;
  facilityUsageScore: number;
  trafficDataScore: number;
  climatePerspectiveScore: number;
  climateBestPracticesScore: number;
  environmentalRisksScore: number;
  environmentalInnovationScore: number;
  projectDescriptionScore: number;
  climateGoalsScore: number;
  organizationClimateGoalScore: number;
  successMeasurementScore: number;
  safetyScore: number;
  medevacScore: number;
  localBenefitsScore: number;
  longTermScore: number;
  communitySupportScore: number;
  contingencyPlanScore: number;
  classBCostScore: number;
  thirdPartyContributionScore: number;
  completionStatus: string;
}

export interface ScoreSummaryTableProps {
  applicationId: number;
}

export interface BroaderReviewScore {
  createdAt: Date;
  updatedAt: Date;
  data: BroaderReviewValues;
  finalScore: number;
  overallComments: string;
  id: number;
  completionStatus: ReviewCompletionStatus;
  // TO-DO: determine what application and user is, id?
  application: string;
  user: string;
  displayName: string;
}
