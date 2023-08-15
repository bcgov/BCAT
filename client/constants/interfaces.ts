import { ReviewCompletionStatus } from './constants';

export interface ContactInfoInterface {
  applicantName: string;
  primaryContactName: string;
  phoneNumber: string;
  mailingAddress: string;
  mailingAddressPostalCode: string;
  isOneApplication: string;
  priority: string;
}

export interface GeneralInfoInterface {
  estimatedCost: string;
  projectType: string;
  facilityMasterPlan: string;
  standardCompliance: string;
  standardComplianceExplanation: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  projectTitle: string;
  projectScope: string;
  projectRationale: string;
}

export interface FundingEligibilityInterface {
  indigenousCommunityServed: string;
  indigenousCommunityServedExplanation: string;
  revenueStream: string;
  revenueStreamExplanation: string;
  greenhouseReductionPlan: string;
  greenhouseReductionPlanExplanation: string;
  activeTransportationSupported: string;
  activeTransportationSupportExplanation: string;
  requiredForMedevac: string;
  requiredForMedevacExplanation: string;
  requiredForWildfireSuppression: string;
  requiredForWildfireSuppressionExplanation: string;
  requiredForEmergency: string;
  requiredForEmergencyExplanation: string;
  requiredForExtraordinaryEvent: string;
  requiredForExtraordinaryEventExplanation: string;
  requiredToCorrectNonCompliance: string;
  requiredToCorrectNonComplianceExplanation: string;
  requiredForClimateChange: string;
  requiredForClimateChangeExplanation: string;
  BCATFunding: string;
  BCATFundingExplanation: string;
}

export interface EnvironmentalInfoInterface {
  environmentalProjectDescription: string;
  environmentalGoals: string;
  projectStrategy: string;
  successAssessment: string;
}

export interface FacilityInfoInterface {
  facilityType: string;
  status: string;
  eligibleForACAP: string;
  madeForACAP: string;
  facilityUsage: string;
  passengerVolumes: string;
  cargoTonnes: string;
  aircraftMovements: string;
}

export interface FundingProjectCostInfoInterface {
  contingencyPlan: string;
  contingencyPlanExplanation: string;
  totalEstimatedCost: string;
  potentialBCAAPShare: string;
  thirdPartyContributions: string;
  applicantShare: string;
  totalRequest: string;
}

export interface SupportDocsInterface {
  docList: any[string];
}

export interface AuthorizationInterface {
  projectManagerSignature: string;
  financialOfficerSignature: string;
}

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

interface BaseReviewValues {
  overallComments: string;
  finalScore: number;
  status: string;
}

export interface NetworkReviewValues extends BaseReviewValues {
  reasonableCostforCommunitySize: number;
  s3ComponentsScore: number;
  s4DescribeHowATNPAlignsWithCommunityGoals: number;
  s4DescribePotentialEconomicBenefits: number;
  s5DetailsHowATNPWillAddressSafetyConcerns: number;
  s6DescribeConsultationUndertaking: number;
  s6DescribeDataCollectionUndertaking: number;
  s6DescribeHowATNPImplementationWillEnsureSuccess: number;
  fundingReceivedLastFiveYears: number;
}

export interface InfrastructureReviewValues extends BaseReviewValues {
  populationScore: number;
  AApopulationScore: number;
  communityNeedsAndSafetyGuidelinesScore: number;
  safetyScore: number;
  AAsafetyScore: number;
  economyAndTourismScore: number;
  environmentScore: number;
  landUseScore: number;
  AAlandUseScore: number;
  accessibilityScore: number;
  promotionScore: number;
  lettersOfSupportScore: number;
  previousFundingScore: number;
  regionalAdjustmentScore: number;
}

export interface ScoreSummaryTableProps {
  applicationId: number;
}

export interface BroaderReviewScore {
  createdAt: Date;
  updatedAt: Date;
  data: InfrastructureReviewValues | NetworkReviewValues;
  finalScore: number;
  overallComments: string;
  id: number;
  status: ReviewCompletionStatus;
  // TODO: determine what application and user is, id?
  application: string;
  user: string;
  displayName: string;
}

export interface AuthorizationInterface {
  projectManagerSignature: string;
  financialOfficerSignature: string;
}

export interface ApplicationStatusInterface {
  id: number;
  name: string;
}
