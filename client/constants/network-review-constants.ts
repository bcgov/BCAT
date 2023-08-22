import { ReviewCompletionStatus } from './constants';
import { NetworkReviewValues } from './interfaces';

export const NetworkEvaluationReviewQuestions = [
  {
    maxScore: 5,
    label: 'Is this project a reasonable cost for the community size?',
    name: 'reasonableCostforCommunitySize',
    descriptionList: [
      '5 points = <$75',
      '4 points = $75-100',
      '3 points= $100-150',
      '1 point = $100-200',
      '0 points = >$200',
    ],
  },
  {
    maxScore: 4,
    label: 'Section 3. Components score',
    name: 's3ComponentsScore',
    descriptionList: [
      `1 point each for a 'yes' answer to questions 3-5 (automated)`,
      '1 point for at least 2 boxes checked on question 6. Up to 4 points total',
    ],
    disabled: true,
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe how the ATNP aligns with community goals',
    name: 's4DescribeHowATNPAlignsWithCommunityGoals',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe the potential economic benefits to your community',
    name: 's4DescribePotentialEconomicBenefits',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label:
      'Section 5: Please provide details on how the Active Transportation Network Plan will address safety concerns',
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any consultation and/or engagement you will be undertaking',
    name: 's6DescribeConsultationUndertaking',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any data collection you will be undertaking',
    name: 's6DescribeDataCollectionUndertaking',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe how you will monitor the ATNP Implementation to ensure success',
    name: 's6DescribeHowATNPImplementationWillEnsureSuccess',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 5,
    label: 'Funding received over the last 5 years',
    name: 'fundingReceivedLastFiveYears',
    descriptionList: [
      'None = 5 pts',
      'less than (<) $500,000 = 3 pts',
      'more than (>) $500,000 = 0 pts',
    ],
  },
];

export const NETWORK_APP_INITIAL_REVIEW_VALUES: NetworkReviewValues = {
  reasonableCostforCommunitySize: 0,
  s3ComponentsScore: 0,
  s4DescribeHowATNPAlignsWithCommunityGoals: 0,
  s4DescribePotentialEconomicBenefits: 0,
  s5DetailsHowATNPWillAddressSafetyConcerns: 0,
  s6DescribeConsultationUndertaking: 0,
  s6DescribeDataCollectionUndertaking: 0,
  s6DescribeHowATNPImplementationWillEnsureSuccess: 0,
  fundingReceivedLastFiveYears: 0,
  completionStatus: ReviewCompletionStatus.IN_PROGRESS,
  finalScore: 0,
  overallComments: '',
};
