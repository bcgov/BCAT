import { ReviewCompletionStatus } from './constants';

export const NetworkEvaluationReviewQuestions = [
  {
    maxScore: 5,
    label: 'Is this project a reasonable cost for the community size?',
    name: 'reasonableCostforCommunitySize',
    description:
      'Score 5 for less than $75, Score 4 for $75-$100, Score 3 for $100-$150, Score 1 for $100-$200, Score 0 for greater than $200.',
  },
  {
    maxScore: 7,
    label: 'Section 3. Components score',
    name: 's3ComponentsScore',
    description: `Score 1 for each 'yes' answer to questions 3-5, Score 1 for at least 2 boxes check on question 6, up to 4 total.`,
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe the potential economic benefits to your community',
    name: 's4DescribePotentialEconomicBenefits',
    description: 'Score 1 for thoughtful, good-quality answer, Score 0 otherwise.',
  },
  {
    maxScore: 1,
    label:
      'Section 5: Please provide details on how the Active Transportation Network Plan will address safety concerns',
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    description: 'Score 1 for thoughtful, good-quality answer, Score 0 otherwise.',
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any consultation and/or engagement you will be undertaking',
    name: 's6DescribeConsultationUndertaking',
    description: 'Score 1 for thoughtful, good-quality answer, Score 0 otherwise.',
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any data collection you will be undertaking',
    name: 's6DescribeDataCollectionUndertaking',
    description: 'Score 1 for thoughtful, good-quality answer, Score 0 otherwise.',
  },
  {
    maxScore: 5,
    label: 'Funding received over the last 5 years',
    name: 'fundingReceivedLastFiveYears',
    description: 'Score 5 for none, Score 3 for less than $500,000, Score 0 for more than $500,000',
  },
];

export const NETWORK_APP_INITIAL_REVIEW_VALUES = {
  reasonableCostforCommunitySize: '',
  s3ComponentsScore: '',
  s4DescribePotentialEconomicBenefits: '',
  s5DetailsHowATNPWillAddressSafetyConcerns: '',
  s6DescribeConsultationUndertaking: '',
  s6DescribeDataCollectionUndertaking: '',
  fundingReceivedLastFiveYears: '',
  completionStatus: ReviewCompletionStatus.IN_PROGRESS,
  finalScore: 0,
  overallComments: '',
};
