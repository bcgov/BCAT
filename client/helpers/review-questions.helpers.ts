const S3_YES_NO_QUESTIONS = [
  's3WillATNPSupportActiveTransportationCommuting',
  's3WillTheATNPIncludeAccessToMajorDestinations',
  's3WillTheActiveTransportationNetworkPlanAddressConflictsCausedByTrafficCongestion',
];

const S3_CHECKBOX_VALUES = 's3WillTheActiveTransportationNetworkLinkToAnyOfTheFollowing';

export const getComponentsScore = (data: any) => {
  let yesNoScore = 0;
  let checkboxScore = 0;

  // check values for yes no questions
  //Score 1 for each 'yes' answer to questions 3-5,
  S3_YES_NO_QUESTIONS.forEach((i: any) => {
    if (data[i] === 'yes') {
      yesNoScore++;
    }
  });

  // check value for checkboxes
  // Score 1 for at least 2 boxes check on question 6, up to 4 total
  Object.values(data[S3_CHECKBOX_VALUES]).forEach((i: any) => {
    if (i && checkboxScore < 4) {
      checkboxScore++;
    }
  });

  const totalScore = yesNoScore + checkboxScore;
  return totalScore;
};
