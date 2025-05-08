import { ApplicationType } from '../common/constants';

export enum ApplicationStatus {
  RECEIVED = 'RECEIVED',
  ASSIGNED = 'ASSIGNED',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  WORKSHOP = 'WORKSHOP',
}

export const findApplicationType = (chefsFormId: string): ApplicationType => {
  if ([process.env.INFRASTRUCTURE_FORM,process.env.INFRASTRUCTURE_INDIGENOUS_FORM].includes(chefsFormId)) {
    return ApplicationType.INFRASTRUCTURE_FORM;    
  }
  else if([process.env.NETWORK_FORM,process.env.NETWORK_INDIGENOUS_FORM].includes(chefsFormId)){      
    return ApplicationType.NETWORK_FORM;    
  }
  return ApplicationType.INFRASTRUCTURE_FORM;  
};

export const NetworkAppScoreFields = [
  {
    name: 'eligibilityScore',
    label: 'Eligibility Score',
    score: 1,
  },
  {
    name: 'reasonableCostforCommunitySize',
    label: 'Project Cost',
    score: 5,
  },
  {
    name: 's3ComponentsScore',
    label: 'Components',
    score: 4,
  },
  {
    name: 's4DescribeHowATNPAlignsWithCommunityGoals',
    label: 'ATNP Alignment With Communities Goals',
    score: 1,
  },
  {
    name: 's4DescribePotentialEconomicBenefits',
    label: 'Economic Benefits',
    score: 1,
  },
  {
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    label: 'Safety',
    score: 1,
  },
  {
    name: 's6DescribeConsultationUndertaking',
    label: 'Consultation',
    score: 1,
  },
  {
    name: 's6DescribeDataCollectionUndertaking',
    label: 'Data Collection',
    score: 1,
  },
  {
    name: 's6DescribeHowATNPImplementationWillEnsureSuccess',
    label: ' ATNP Implementation',
    score: 1,
  },
  {
    name: 'fundingReceivedLastFiveYears',
    label: 'Funding Over The Last 5 Years',
    score: 5,
  },
];

export const InfrastructureScoreFields = [
  {
    name: 'eligibilityScore',
    label: 'Eligibility Score',
    score: 1,
  },
  {
    name: 'populationScore',
    label: 'Population Score',
    score: 15,
  },
  {
    //safety score = 23, community and safety score = 10
    name: 'safetyScore',
    label: 'Safety',
    score: 33,
  },
  {
    name: 'economyAndTourismScore',
    label: 'Economy / Tourism',
    score: 5,
  },
  {
    name: 'environmentScore',
    label: 'Environment',
    score: 8,
  },
  {
    name: 'landUseScore',
    label: 'Connectivity / Land Use',
    score: 15,
  },
  {
    name: 'accessibilityScore',
    label: 'Accessibility / Intersectionality',
    score: 8,
  },
  {
    name: 'promotionScore',
    label: 'Promotion / Education',
    score: 3,
  },
  {
    name: 'lettersOfSupportScore',
    label: 'Letters of Support',
    score: 3,
  },
  {
    name: 'previousFundingScore',
    label: 'No Previous Funding',
    score: 5,
  },
  {
    name: 'regionalAdjustmentScore',
    label: 'Regional Adjustment Scoring',
    score: 5,
  },
];
