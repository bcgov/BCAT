export const INFRASTRUCTURE_REVIEW_QUESTIONS = [
  {
    maxScore: 15,
    label: 'Section 1: Population Score (auto)',
    secondaryList: [
      'Section 1 - Government applicant type: If Indigenous Govt or Indigenous Govt Partnership = 15 pts',
      'Section 1 - Government applicant type: If Local (non Indigenous) Govt <li 15k pop = 10 pts',
      'Section 1 - Government applicant type: If Local Govt (non Indigenous) > 15k and <25k pop = 5pts',
      'Section 1 - Government applicant type: If Local Govt (non Indigenous) > 25k pop = 0 pts',
    ],
    isAutomated: true,
    hiddenInput: true,
    name: 'populationScore',
  },
  {
    maxScore: 10,
    label: 'Section 6: Does this project meet community needs and safety guidelines? (manual)',
    descriptionList: [
      'Section 6 - Q29: Listing of BCAT Design Guide or other publication = 1 pt',
      'Section 6 - Q29: Explanation of how project aligns with guide = up to 2 pts',
      'Section 6 - Q30: Safety addressed  w/ supporting rationale = up to 3 pts',
      'Section 6 - Q30: Supporting data or anecdotal evidence is provided = up to 2 pts',
      'Section 6 - Q31: Safety monitoring plan = 2 pts',
    ],
    name: 'communityNeedsAndSafetyGuidelinesScore',
  },
  {
    maxScore: 23,
    label: 'Section 6: Safety Score',
    descriptionList: [
      'Section 6 - Q33: Question "The BC Active Transportation Design Guide recommends minimum widths for different types and contexts of active transportation infrastructure (see pg. 15 of the Program Guidelines). Does the proposed infrastructure align with the Design Guide recommendations?" - Only if Local context is selected = 0-4pts (manual)',
      'Section 6 - Q34: Question "When the project encounters or transitions to another facility type (e.g., a bike lane crossing an intersection, a multi-use path ending at a sidewalk), are there design features in place to minimize conflicts and ensure a safe transition for all intended users?" = 2 pts for each design feature listed, up to 5 pts (manual)',
    ],
    secondaryList: [
      'Section 6 - Q32: Question "Identify which additional safety measures exist within the design of your project" = 1 pt each for each box ticked (ex: Lighting, Signage, etc) (auto)',
      'Section 6 - Q33: Question "The BC Active Transportation Design Guide recommends minimum widths for different types and contexts of active transportation infrastructure (see pg. 15 of the Program Guidelines). Does the proposed infrastructure align with the Design Guide recommendations?" - If Desired, or N/A is selected = 4pts (auto); if Constrained is selected = 2pts (auto);',
      'Section 6 - Q34: Question "The B.C. Active Transportation Design Guide recommends certain facility types for different road contexts, e.g., speed and volume. Does the proposed infrastructure align with Design Guide recommendations?" - If Yes, or N/A is selected = 4pts (auto)',
    ],
    isAutomated: true,
    tooltiptext:
      'Higher points = small, rural community, legitimate space/cost/capacity concerns. Lower points = not wanting to remove parking, lack of political or community will, cost concerns from larger urban centre with more resources',
    name: 'safetyScore',
  },
  {
    maxScore: 5,
    label: 'Section 7: Economy and Tourism Score (manual)',
    descriptionList: [
      'Section 7 - Q35: What are the economic benefits? = up to 3 pts',
      'Section 7 - Q36: How will this project contribute to tourism? = up to 2 pts',
    ],
    tooltiptext:
      'Score on how the project connects people to businesses, new business areas, new industry, etc. for economic benefits; Score on how project will protect current tourism or provide new tourism opportunities for tourism;',
    name: 'economyAndTourismScore',
  },
  {
    maxScore: 8,
    label: 'Section 7: Environment Score (manual)',
    descriptionList: ['Section 7 - Q37: Environmental Benefits = up to 3 pts'],
    tooltiptext:
      'Score on: GHG reductions, local measurements of GHG share from transportation, local sustainability plans for Environmental Benefits; Score on: local materials and labour, climate adaptation measures, dust mitigation, using recycled materials, drought-friendly plantings, using less toxic materials for Environmental Best Practices;',
    name: 'environmentScore',
  },
  {
    maxScore: 15,
    label: 'Section 7: Land Use Score',
    descriptionList: [
      'Section 7 - Q41: Does this project fill gaps between 2 or more AT Facilities = 2 pts (manual)',
      'Section 7 - Q42 / Explain how this project creates connections for your communitys active transportation network: Is this project a component of larger infrastructure project = 3 pts (manual)',
    ],
    secondaryList: [
      'Section 7 - Q38: Multi-modal Integration = 1 pt for each box, max 3 (auto)',
      'Section 7 - Q39: Connects w/ community infrastructure = 1 pt for each box, max 4 (auto)',
      'Section 7 - Q40: Connect w/  AT infrastructure = 1 pt for each box, max 3 (auto)',
    ],
    isAutomated: true,
    name: 'landUseScore',
  },
  {
    maxScore: 8,
    label: 'Section 7: Accessibility Score (manual)',
    descriptionList: [
      'Section 7 - Q43: Does this Project Incorporate Universal Design? = up to 5 pts',
      'Section 7 - Q44 (How does this project incorporate principles of GBA): Does This Project Incorporate GBA+ Principles? = up to 3 pts',
    ],
    tooltiptext:
      'Score on: curb cuts, grading, smooth surfaces, ramps, width, accessible washrooms, lighting, handrails, TWSIs, audible crossing signals, etc.; Score on: lighting, gender-neutral and family friendly washrooms, economically disadvantaged area, GBA+ training by project team, age-friendly design, rainbow crosswalks, signage in other languages, Indigenous land acknowledgements/ names on wayfinding signage, etc.;',
    name: 'accessibilityScore',
  },
  {
    maxScore: 3,
    label: 'Section 7: Promotion Score (manual)',
    tooltiptext:
      'Score on promotional & educational activities = media event, signage, advertising, bike/ped maps, cycling courses, targeted outreach',
    descriptionList: ['Section 7 - Q45: 1 pt for each promotional feature listed, max 3'],
    name: 'promotionScore',
  },
  {
    maxScore: 3,
    label: 'Letters of Support (manual)',
    descriptionList: [
      'Section 10 Letter(s) of support (if applicable): 1 pt for each letter of support, max 3',
    ],
    name: 'lettersOfSupportScore',
  },
  {
    maxScore: 5,
    label: 'Section 8: Previous funding (manual)',
    descriptionList: [
      'Section 8: None = 5 pts',
      'Section 8: less than (<) $500,000 = 3 pts',
      'Section 8: more than (>) $500,000 = 0 pts',
    ],
    name: 'previousFundingScore',
    tooltiptext: 'Funding Amount over last 5 years',
  },
  {
    maxScore: 5,
    label: 'Section 1: Regional Adjustment Scoring (manual)',
    descriptionList: [
      'Section 1 - City: Vancouver Island/Coast = 1',
      'Section 1 - City: Lower Mainland /Southwest = 0',
      'Section 1 - City: Thompson-Okanagan = 2',
      'Section 1 - City: Kootenay = 3',
      'Section 1 - City: Cariboo = 4',
      'Section 1 - City: North Coast = 5',
      'Section 1 - City: Nechako = 5',
      'Section 1 - City: Northeast = 5',
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
    label:
      'Section 1 / Section 8: Is this project a reasonable cost for the community size? (manual)',
    name: 'reasonableCostforCommunitySize',
    descriptionList: [
      'Section 1 / Section 8: 5 points = <$75',
      'Section 1 / Section 8: 4 points = $75-100',
      'Section 1 / Section 8: 3 points= $100-150',
      'Section 1 / Section 8: 1 point = $100-200',
      'Section 1 / Section 8: 0 points = >$200',
    ],
    tooltiptext: 'Divide Total Estimated Project Cost by Community Population',
  },
  {
    maxScore: 4,
    label: 'Section 3: Components score (auto)',
    name: 's3ComponentsScore',
    secondaryList: [
      `Section 3 - Q6-Q8: 1 point each for a 'yes' answer to questions 6-8 (automated)`,
      'Section 3 - Q9: 1 point for at least 2 boxes checked on question 9. Up to 4 points total',
    ],
    isAutomated: true,
    hiddenInput: true,
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe how the ATNP aligns with community goals (manual)',
    name: 's4DescribeHowATNPAlignsWithCommunityGoals',
    descriptionList: [
      'Section 4 - Q10: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 1,
    label: 'Section 4: Describe the potential economic benefits to your community (manual)',
    name: 's4DescribePotentialEconomicBenefits',
    descriptionList: [
      'Section 4 - Q11: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 1,
    label:
      'Section 5: Please provide details on how the Active Transportation Network Plan will address safety concerns (manual)',
    name: 's5DetailsHowATNPWillAddressSafetyConcerns',
    descriptionList: [
      'Section 5 - Q12: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 1,
    label:
      'Section 6: Describe any consultation and/or engagement you will be undertaking (manual)',
    name: 's6DescribeConsultationUndertaking',
    descriptionList: [
      'Section 6 - Q14: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 1,
    label: 'Section 6: Describe any data collection you will be undertaking (manual)',
    name: 's6DescribeDataCollectionUndertaking',
    descriptionList: [
      'Section 6 - Q15: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 1,
    label:
      'Section 6: Describe how you will monitor the ATNP Implementation to ensure success (manual)',
    name: 's6DescribeHowATNPImplementationWillEnsureSuccess',
    descriptionList: [
      'Section 6 - Q16: 1 point for thoughtful, good-quality answer, 0 points otherwise',
    ],
  },
  {
    maxScore: 5,
    label: 'Section 8: Funding received over the last 5 years (manual)',
    name: 'fundingReceivedLastFiveYears',
    descriptionList: [
      'Section 8: None = 5 pts',
      'Section 8: less than (<) $500,000 = 3 pts',
      'Section 8: $500,000 or more = 0 pts',
    ],
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
