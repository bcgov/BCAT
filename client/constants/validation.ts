import * as Yup from 'yup';

const minValidationText = 'Must be greater than or equal to ';
const maxValidationText = 'Must be less than or equal to ';

export const INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA = Yup.object().shape({
  populationScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15')
    .required('This field is required'),

  communityNeedsAndSafetyGuidelinesScore: Yup.number()
    .min(0, minValidationText + '0')
    .max(15, maxValidationText + '15')
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
