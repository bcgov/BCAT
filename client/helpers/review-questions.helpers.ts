const S3_YES_NO_QUESTIONS = [
  's3WillATNPSupportActiveTransportationCommuting',
  's3WillTheATNPIncludeAccessToMajorDestinations',
  's3WillTheActiveTransportationNetworkPlanAddressConflictsCausedByTrafficCongestion',
];

const S3_CHECKBOX_VALUES = 's3WillTheActiveTransportationNetworkLinkToAnyOfTheFollowing';

// max point total of 4
export const getComponentsScore = (data: any) => {
  let score = 0;
  let checkboxesSelected = 0;

  // check values for yes no questions
  //Score 1 for each 'yes' answer to questions 6-8,
  S3_YES_NO_QUESTIONS.some((i: any) => {
    if (data[i] === 'yes') {
      score++;
    }
  });

  // check value for checkboxes
  // Score 1 for at least 2 boxes check on question 9, 0 for 1 or less selected
  Object.values(data[S3_CHECKBOX_VALUES]).some((i: any) => {
    if (i && checkboxesSelected < 2) {
      checkboxesSelected++;
    }
    // exit loop if at least 2 checkboxes are selected
    return checkboxesSelected === 2;
  });

  const totalScore = score + (checkboxesSelected === 2 ? 1 : 0);
  return totalScore;
};
