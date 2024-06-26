import { useEffect } from 'react';
import { Formik, Form } from 'formik';

import { Button, Spinner } from '../generic';
import {
  INFRASTRUCTURE_REVIEW_QUESTIONS,
  INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA,
  NETWORK_REVIEW_VALIDATION_SCHEMA,
  ReviewCompletionStatus,
  ApplicationType,
  NETWORK_REVIEW_QUESTIONS,
} from '../../constants';
import { Textarea, Radio, Error } from '../form';
import { UserInterface } from '../../contexts';
import { FinalScore, Input, UserView } from '../broader-review';
import { useBroaderReview } from '../../services';
import { getComponentsScore, getInfrastructureAutomatedScores } from 'helpers';

export type BroaderReviewProps = {
  applicationId: number;
  applicationType: ApplicationType;
  formData: any;
  userList: UserInterface[];
};

export const BroaderReview: React.FC<BroaderReviewProps> = ({
  applicationId,
  applicationType,
  formData,
  userList,
}) => {
  const {
    applicationScores,
    applicationScoresByScorer,
    handleSubmit,
    selectedUser,
    isLoggedInUser,
    handleChangeScorer,
    loggedInUser,
    isLoading,
  } = useBroaderReview(applicationId, applicationType);

  const evaluationReviewQuestions =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? INFRASTRUCTURE_REVIEW_QUESTIONS
      : NETWORK_REVIEW_QUESTIONS;

  useEffect(() => {
    // network auto values
    if (applicationType === ApplicationType.NETWORK_FORM && applicationScoresByScorer) {
      const componentsScore = getComponentsScore(formData.s3Container);
      applicationScoresByScorer.AAs3ComponentsScore = componentsScore;
    }
    if (applicationType === ApplicationType.INFRASTRUCTURE_FORM && applicationScoresByScorer) {
      const scoreValues = getInfrastructureAutomatedScores(formData);

      applicationScoresByScorer.AAlandUseScore = scoreValues?.landUseScore || 0;
      applicationScoresByScorer.AApopulationScore = scoreValues?.populationScore || 0;
      applicationScoresByScorer.AAsafetyScore = scoreValues?.safetyScore || 0;
    }
  }, [applicationScoresByScorer]);

  return (
    <>
      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <Formik
          initialValues={applicationScoresByScorer}
          validationSchema={
            applicationType === ApplicationType.INFRASTRUCTURE_FORM
              ? INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA
              : NETWORK_REVIEW_VALIDATION_SCHEMA
          }
          onSubmit={handleSubmit}
          enableReinitialize={true}
          key={applicationId}
        >
          {({ isValid, values }) => (
            <Form>
              <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
                <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
                  <div className='flex'>
                    <div className='w-1/2 p-2'>Broader Evaluation Board</div>
                    <div className='w-1/2 flex justify-end'>
                      {isLoggedInUser && (
                        <Button
                          variant='primary'
                          customClass='py-2 '
                          type='submit'
                          disabled={!isValid || !values?.eligibilityScore}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className='p-4 grid grid-flow-row gap-4'>
                    <div>
                      <div className='bg-white divide-y'>
                        <div className='py-5'>
                          <Radio
                            horizontal
                            label={`Section ${
                              applicationType === ApplicationType.INFRASTRUCTURE_FORM ? '3' : '2'
                            }: Does this project meet the eligibility requirements necessary to advance in the evaluation process? (manual)`}
                            name='eligibilityScore'
                            options={[
                              { label: 'Yes', value: 'yes' },
                              { label: 'No', value: 'no' },
                            ]}
                          />
                        </div>

                        {evaluationReviewQuestions.map((item: any, index) => (
                          <div key={`BroaderReviewInput_${index}`} className='py-5'>
                            <Input
                              descriptionList={item.descriptionList}
                              disabled={!isLoggedInUser || values?.eligibilityScore === 'no'}
                              hiddenInput={item.hiddenInput}
                              label={item.label}
                              name={item.name}
                              tooltiptext={item.tooltiptext}
                              maxScore={item.maxScore}
                            />
                            <Error name={item.name} />

                            {item.isAutomated && (
                              <>
                                <Input
                                  disabled
                                  name={`AA${item.name}`}
                                  secondaryList={item.secondaryList}
                                />
                                <Error name={`AA${item.name}`} />
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <Textarea
                        name='overallComments'
                        label='Overall comments'
                        disabled={!isLoggedInUser}
                      />
                      <FinalScore />

                      {isLoggedInUser && (
                        <div className='flex flex-1 w-full justify-start'>
                          <Radio
                            title='Status'
                            legend='Select status for your score on this application.'
                            name='status'
                            horizontal={true}
                            options={[
                              { label: 'In Progress', value: ReviewCompletionStatus.IN_PROGRESS },
                              { label: 'Completed', value: ReviewCompletionStatus.COMPLETE },
                            ]}
                          ></Radio>
                        </div>
                      )}

                      {/* TODO: User list on who's reviewing and completed should be fetched from the backend for each application */}
                      {userList && (
                        <div className='mt-4'>
                          {userList.map((item: any) => {
                            const scoreStatus = applicationScores.filter(
                              (i: any) => item.id == i.user,
                            );
                            return (
                              <UserView
                                key={`BroderReviewUsers_${item.id}`}
                                user={item}
                                scoreStatus={scoreStatus}
                                loggedInUser={loggedInUser}
                                selected={selectedUser == item.id}
                                handleClick={() => handleChangeScorer(item.id)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
