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
    score: 4,
  },
  {
    name: 's4DescribeHowATNPAlignsWithCommunityGoals',
    label: 'How ATNP aligns with community goals',
    score: 1,
  },
  {
    name: 's4DescribePotentialEconomicBenefits',
    label: 'Potential Economic Benefits',
    score: 1,
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
    name: 's6DescribeHowATNPImplementationWillEnsureSuccess',
    label: 'How you will monitor ATNP implementation to ensure success',
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
    name: 'projectTypeScore',
    label: 'Type of Project',
    score: 10,
  },
  {
    name: 'projectNeedScore',
    label: 'Need for project',
    score: 5,
  },
  {
    name: 'projectFundingScore',
    label: 'Need for funding',
    score: 5,
  },
  {
    name: 'pastBcaapFundingScore',
    label: 'Past BCAAP funding',
    score: 3,
  },
  // {
  //   name: 'facilityMasterPlanScore',
  //   label: 'Project in Master Plan',
  //   criteria: [
  //     ApplicationType.LARGE_PROJECT,
  //     ApplicationType.SMALL_PROJECT,
  //     ApplicationType.ENVIRONMENT_PLANNING,
  //   ],
  //   score: 2,
  // },
  {
    name: 'facilityUsageScore',
    label: 'Facility usage',
    score: 2,
  },
  // {
  //   name: 'trafficDataScore',
  //   label: 'Traffic data',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 3,
  // },
  // {
  //   name: 'climatePerspectiveScore',
  //   label: 'Environmental / Climate Benefits',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 5,
  // },
  // {
  //   name: 'climateBestPracticesScore',
  //   label: 'Environmental / Climate Best Practices',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 5,
  // },
  // {
  //   name: 'environmentalRisksScore',
  //   label: 'Environmental Risk and Mitigation',
  //   criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
  //   score: 5,
  // },
  // {
  //   name: 'environmentalInnovationScore',
  //   label: 'Environmental / Climate Innovation',
  //   criteria: [ApplicationType.LARGE_PROJECT, ApplicationType.SMALL_PROJECT],
  //   score: 5,
  // },
  // {
  //   name: 'projectDescriptionScore',
  //   label: 'Type of Environmental Project',
  //   criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  //   score: 2,
  // },
  // {
  //   name: 'climateGoalsScore',
  //   label: 'Environmental / Climate Goals of Project',
  //   criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  //   score: 5,
  // },
  // {
  //   name: 'organizationClimateGoalScore',
  //   label: 'Fit With Organization’s Broader Goals',
  //   criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  //   score: 5,
  // },
  // {
  //   name: 'successMeasurementScore',
  //   label: 'Measuring Project Success',
  //   criteria: [ApplicationType.ENVIRONMENT_PLANNING],
  //   score: 5,
  // },
  // {
  //   name: 'safetyScore',
  //   label: 'Safety',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 15,
  // },
  // {
  //   name: 'medevacScore',
  //   label: 'Medevac / Wildfire Suppression',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 15,
  // },
  // {
  //   name: 'localBenefitsScore',
  //   label: 'Economic Benefits',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 10,
  // },
  // {
  //   name: 'longTermScore',
  //   label: 'Long Term Goals and Vision',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 5,
  // },
  // {
  //   name: 'communitySupportScore',
  //   label: 'Letters of Support',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 3,
  // },
  // {
  //   name: 'concernsScore',
  //   label: 'Concerns Raised / Addressed',
  //   criteria: [ApplicationType.LARGE_PROJECT],
  //   score: 5,
  // },
  {
    name: 'contingencyPlanScore',
    label: 'Contingency Plan',
    score: 2,
  },
  {
    name: 'classBCostScore',
    label: 'Cost Estimates',
    score: 5,
  },
  {
    name: 'thirdPartyContributionScore',
    label: 'Applicant or third-party contributions',
    score: 2,
  },
];
