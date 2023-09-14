export const INFRASTRUCTURE_REVIEW_QUESTIONS = [
  {
    maxScore: 15,
    label: 'Population Score (auto)',
    secondaryList: [
      'If Indigenous Govt or Indigenous Govt Partnership = 15 pts',
      'If Local (non Indigenous) Govt <li 15k pop = 10 pts',
      'If Local Govt (non Indigenous) > 15k and <25k pop = 5pts',
      'If Local Govt (non Indigenous) > 25k pop = 0 pts',
    ],
    isAutomated: true,
    hiddenInput: true,
    name: 'populationScore',
  },
  {
    maxScore: 10,
    label: 'Does this project meet community needs and safety guidelines? (manual)',
    descriptionList: [
      'Listing of BCAT Design Guide or other publication = 1 pt',
      'Explanation of how project aligns with guide = up to 2 pts',
      'Safety addressed  w/ supporting rationale = up to 3 pts',
      'Supporting data or anecdotal evidence is provided = up to 2 pts',
      'Safety monitoring plan = 2 pts',
    ],
    name: 'communityNeedsAndSafetyGuidelinesScore',
  },
  {
    maxScore: 23,
    label: 'Safety Score',
    descriptionList: [
      'Solid physical barrier, substantial distancing, valid other/alternative approach (traffic calming), end-of-trip facilities only = 5 pt (manual)',
      'Minimal physical barrier, minimal physical distancing, or minimal other/alternative approach = 2 pts (manual)',
      'Not physically separated = 0 pts (manual)',
      'Section 6. Question "The BC Active Transportation Design Guide recommends minimum widths for different types and contexts of active transportation infrastructure (see pg. 15 of the Program Guidelines). Does the proposed infrastructure align with the Design Guide recommendations?" - Only if Local context is selected = 0-4pts (manual)',
      'Section 6. Question "When the project encounters or transitions to another facility type (e.g., a bike lane crossing an intersection, a multi-use path ending at a sidewalk), are there design features in place to minimize conflicts and ensure a safe transition for all intended users?" = 2 pts for each design feature listed, up to 5 pts (manual)',
    ],
    secondaryList: [
      'Section 6. Question "Identify which additional safety measures exist within the design of your project" = 1 pt each for each box ticked (ex: Lighting, Signage, etc) (auto)',
      'Section 6. Question "The BC Active Transportation Design Guide recommends minimum widths for different types and contexts of active transportation infrastructure (see pg. 15 of the Program Guidelines). Does the proposed infrastructure align with the Design Guide recommendations?" - If Desired, or N/A is selected = 4pts (auto); if Constrained is selected = 2pts (auto);',
      'Section 6. Question "The B.C. Active Transportation Design Guide recommends certain facility types for different road contexts, e.g., speed and volume. Does the proposed infrastructure align with Design Guide recommendations?" - If Yes, or N/A is selected = 4pts (auto)',
    ],
    isAutomated: true,
    tooltiptext:
      'Higher points = small, rural community, legitimate space/cost/capacity concerns. Lower points = not wanting to remove parking, lack of political or community will, cost concerns from larger urban centre with more resources',
    name: 'safetyScore',
  },
  {
    maxScore: 5,
    label: 'Economy and Tourism Score (manual)',
    descriptionList: [
      'What are the economic benefits? = up to 3 pts',
      'How will this project contribute to tourism? = up to 2 pts',
    ],
    tooltiptext:
      'Score on how the project connects people to businesses, new business areas, new industry, etc. for economic benefits; Score on how project will protect current tourism or provide new tourism opportunities for tourism;',
    name: 'economyAndTourismScore',
  },
  {
    maxScore: 8,
    label: 'Environment Score (manual)',
    descriptionList: [
      'Environmental Benefits = up to 3 pts',
      'Will the project retain existing Trees? = up to 2 pts',
      'Environmental Best Practices = up to 3 pts',
    ],
    tooltiptext:
      'Score on: GHG reductions, local measurements of GHG share from transportation, local sustainability plans for Environmental Benefits; Score on: local materials and labour, climate adaptation measures, dust mitigation, using recycled materials, drought-friendly plantings, using less toxic materials for Environmental Best Practices;',
    name: 'environmentScore',
  },
  {
    maxScore: 15,
    label: 'Land Use Score',
    descriptionList: [
      'Does this project fill gaps between 2 or more AT Facilities = 2 pts (manual)',
      'Is this project a component of larger infrastructure project = 3 pts (manual)',
    ],
    secondaryList: [
      'Multi-modal Integration = 1 pt for each box, max 3 (auto)',
      'Connects w/ community infrastructure = 1 pt for each box, max 4 (auto)',
      'Connect w/  AT infrastructure = 1 pt for each box, max 3 (auto)',
    ],
    isAutomated: true,
    name: 'landUseScore',
  },
  {
    maxScore: 8,
    label: 'Accessibility Score (manual)',
    descriptionList: [
      'Does this Project Incorporate Universal Design? = up to 5 pts',
      'Does This Project Incorporate GBA+ Principles? = up to 3 pts',
    ],
    tooltiptext:
      'Score on: curb cuts, grading, smooth surfaces, ramps, width, accessible washrooms, lighting, handrails, TWSIs, audible crossing signals, etc.; Score on: lighting, gender-neutral and family friendly washrooms, economically disadvantaged area, GBA+ training by project team, age-friendly design, rainbow crosswalks, signage in other languages, Indigenous land acknowledgements/ names on wayfinding signage, etc.;',
    name: 'accessibilityScore',
  },
  {
    maxScore: 3,
    label: 'Promotion Score (manual)',
    tooltiptext:
      'Score on promotional & educational activities = media event, signage, advertising, bike/ped maps, cycling courses, targeted outreach',
    descriptionList: ['1 pt for each promotional feature listed, max 3'],
    name: 'promotionScore',
  },
  {
    maxScore: 3,
    label: 'Letters of Support (manual)',
    descriptionList: ['1 pt for each letter of support, max 3'],
    name: 'lettersOfSupportScore',
  },
  {
    maxScore: 5,
    label: 'Previous funding (manual)',
    descriptionList: [
      'None = 5 pts',
      'less than (<) $500,000 = 3 pts',
      'more than (>) $500,000 = 0 pts',
    ],
    name: 'previousFundingScore',
    tooltiptext: 'Funding Amount over last 5 years',
  },
  {
    maxScore: 5,
    label: 'Regional Adjustment Scoring (manual)',
    descriptionList: [
      'Vancouver Island/Coast = 1',
      'Lower Mainland /Southwest = 0',
      'Thompson-Okanagan = 2',
      'Kootenay = 3',
      'Cariboo = 4',
      'North Coast = 5',
      'Nechako = 5',
      'Northeast = 5',
    ],
    name: 'regionalAdjustmentScore',
  },
];

export const INITIAL_INFRASTRUCTURE_REVIEW_VALUES = {
  populationScore: 0,
  AApopulationScore: 0,
  communityNeedsAndSafetyGuidelinesScore: 0,
  safetyScore: 0,
  AAsafetyScore: 0,
  economyAndTourismScore: 0,
  environmentScore: 0,
  landUseScore: 0,
  AAlandUseScore: 0,
  accessibilityScore: 0,
  promotionScore: 0,
  lettersOfSupportScore: 0,
  previousFundingScore: 0,
  regionalAdjustmentScore: 0,
  finalScore: 0,
  overallComments: '',
};

export const NETWORK_REVIEW_QUESTIONS = [
  {
    maxScore: 5,
    label: 'Is this project a reasonable cost for the community size? (manual)',
    name: 'reasonableCostforCommunitySize',
    descriptionList: [
      '5 points = <$75',
      '4 points = $75-100',
      '3 points= $100-150',
      '1 point = $100-200',
      '0 points = >$200',
    ],
    tooltiptext: 'Divide Total Estimated Project Cost by Community Population',
  },
  {
    maxScore: 4,
    label: 'Section 3. Components score (auto)',
    name: 's3ComponentsScore',
    secondaryList: [
      `1 point each for a 'yes' answer to questions 6-8 (automated)`,
      '1 point for at least 2 boxes checked on question 9. Up to 4 points total',
    ],
    isAutomated: true,
    hiddenInput: true,
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe how the ATNP aligns with community goals (manual)',
    name: 's4DescribeHowATNPAlignsWithCommunityGoals',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe the potential economic benefits to your community (manual)',
    name: 's4DescribePotentialEconomicBenefits',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label:
      'Section 5: Please provide details on how the Active Transportation Network Plan will address safety concerns (manual)',
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label:
      'Section 6: Describe any consultation and/or engagement you will be undertaking (manual)',
    name: 's6DescribeConsultationUndertaking',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any data collection you will be undertaking (manual)',
    name: 's6DescribeDataCollectionUndertaking',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 1,
    label:
      'Section 6: Describe how you will monitor the ATNP Implementation to ensure success (manual)',
    name: 's6DescribeHowATNPImplementationWillEnsureSuccess',
    descriptionList: ['1 point for thoughtful, good-quality answer, 0 points otherwise'],
  },
  {
    maxScore: 5,
    label: 'Funding received over the last 5 years (manual)',
    name: 'fundingReceivedLastFiveYears',
    descriptionList: ['None = 5 pts', 'less than (<) $500,000 = 3 pts', '$500,000 or more = 0 pts'],
  },
];

export const NETWORK_APP_INITIAL_REVIEW_VALUES = {
  AAs3ComponentsScore: 0,
  fundingReceivedLastFiveYears: 0,
  reasonableCostforCommunitySize: 0,
  s3ComponentsScore: 0,
  s4DescribeHowATNPAlignsWithCommunityGoals: 0,
  s4DescribePotentialEconomicBenefits: 0,
  s5DetailsHowATNPWillAddressSafetyConcerns: 0,
  s6DescribeConsultationUndertaking: 0,
  s6DescribeDataCollectionUndertaking: 0,
  s6DescribeHowATNPImplementationWillEnsureSuccess: 0,
  finalScore: 0,
  overallComments: '',
};
