import { ReviewCompletionStatus } from './constants';

export interface ApplicationTableProps {
  Application_ID: number;
  Submission: string;
  Confirmation_ID: string;
  Facility_Name: string;
  Assigned_To: string;
  Status: string;
  Created_At: string;
  Updated_At: string;
  Chefs_ID: string;
  BCAAP_Form_ID: number;
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
