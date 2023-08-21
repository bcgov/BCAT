import { ApplicationType } from '../common/constants';

export enum ApplicationStatus {
  RECEIVED = 'RECEIVED',
  ASSIGNED = 'ASSIGNED',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  WORKSHOP = 'WORKSHOP',
}

export const findApplicationType = (chefsFormId: string): ApplicationType => {
  switch (chefsFormId) {
    case process.env.INFRASTRUCTURE_FORM:
      return ApplicationType.INFRASTRUCTURE_FORM;

    case process.env.NETWORK_FORM:
      return ApplicationType.NETWORK_FORM;

    default:
      return ApplicationType.INFRASTRUCTURE_FORM;
  }
};

export const NetworkAppScoreFields = [
  {
    name: 'reasonableCostforCommunitySize',
    label: 'Is project a reasonable cost for the community size',
    score: 5,
  },
  {
    name: 's3ComponentsScore',
    label: 'Components score',
    score: 7,
  },
  {
    name: 's4DescribePotentialEconomicBenefits',
    label: 'Potential Economic Benefits',
    score: 5,
  },
  {
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    label: 'Details how ATNP will address safety concerns',
    score: 1,
  },
  {
    name: 's6DescribeConsultationUndertaking',
    label: 'Consultation and/or engagement undertaking',
    score: 1,
  },
  {
    name: 's6DescribeDataCollectionUndertaking',
    label: 'Data collection undertaking',
    score: 1,
  },
  {
    name: 'fundingReceivedLastFiveYears',
    label: 'Funding received over the last 5 years',
    score: 5,
  },
];

export const ScoreFields = [
  {
    name: 'populationScore',
    label: 'Population score',
    score: 15,
  },
  {
    name: 'communityNeedsAndSafetyGuidelinesScore',
    label: 'Community and safety score',
    score: 15,
  },
  {
    name: 'safetyScore',
    label: 'Safety score',
    score: 23,
  },
  {
    name: 'economyAndTourismScore',
    label: 'Economy and tourism score',
    score: 5,
  },
  {
    name: 'environmentScore',
    label: 'Environment score',
    score: 8,
  },
  {
    name: 'landUseScore',
    label: 'Land use score',
    score: 15,
  },
  {
    name: 'accessibilityScore',
    label: 'Accessibility score',
    score: 8,
  },
  {
    name: 'promotionScore',
    label: 'Promotion score',
    score: 3,
  },
  {
    name: 'lettersOfSupportScore',
    label: 'Letters of support score',
    score: 3,
  },
  {
    name: 'previousFundingScore',
    label: 'Previous funding score',
    score: 5,
  },
  {
    name: 'regionalAdjustmentScore',
    label: 'Regional adjustments score',
    score: 5,
  },
];
