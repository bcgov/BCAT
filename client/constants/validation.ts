import * as Yup from 'yup';

const minValidationText = 'Must be greater than or equal to ';
const maxValidationText = 'Must be less than or equal to ';

export const NETWORK_REVIEW_VALIDATION_SCHEMA = Yup.object().shape({
  // network application review validation
  eligibilityScore: Yup.string().required('This field is required'),

  reasonableCostforCommunitySize: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5')
    .required('This field is required'),
  s3ComponentsScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(4, maxValidationText + '4')
    .required('This field is required'),
  s4DescribePotentialEconomicBenefits: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  s4DescribeHowATNPAlignsWithCommunityGoals: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  s5DetailsHowATNPWillAddressSafetyConcerns: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  s6DescribeConsultationUndertaking: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  s6DescribeDataCollectionUndertaking: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  s6DescribeHowATNPImplementationWillEnsureSuccess: Yup.number()
    .min(0, minValidationText + '0')
    .max(1, maxValidationText + '1')
    .required('This field is required'),
  fundingReceivedLastFiveYears: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5')
    .required('This field is required'),
  finalScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(21, maxValidationText + '21'),
});

export const INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA = Yup.object().shape({
  eligibilityScore: Yup.string().required('This field is required'),

  populationScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15')
    .required('This field is required'),

  communityNeedsAndSafetyGuidelinesScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(10, maxValidationText + '10')
    .required('This field is required'),

  safetyScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(23, maxValidationText + '23')
    .required('This field is required'),

  economyAndTourismScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5')
    .required('This field is required'),

  environmentScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(8, maxValidationText + '8')
    .required('This field is required'),

  landUseScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15')
    .required('This field is required'),

  accessibilityScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(8, maxValidationText + '8')
    .required('This field is required'),

  promotionScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(3, maxValidationText + '3')
    .required('This field is required'),

  lettersOfSupportScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(3, maxValidationText + '3')
    .required('This field is required'),

  previousFundingScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5')
    .required('This field is required'),

  regionalAdjustmentScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(5, maxValidationText + '5')
    .required('This field is required'),

  finalScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(100, maxValidationText + '100')
    .required('This field is required'),
});

export const TOKEN_VALIDATION_SCHEMA = Yup.object().shape({
  token: Yup.string().required('This field is required'),
});
