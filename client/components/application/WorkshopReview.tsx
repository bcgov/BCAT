import { useEffect } from 'react';
import { Formik, Form } from 'formik';

import { useWorkshopReview } from '../../services';
import { Button, Spinner } from '../generic';
import {
  INFRASTRUCTURE_REVIEW_QUESTIONS,
  INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA,
  ReviewCompletionStatus,
  ApplicationType,
  NetworkEvaluationReviewQuestions,
} from '../../constants';
import { Textarea, Radio, Error } from '../form';
import { FinalScore, Input } from '../broader-review';
import { getInfrastructureAutomatedScores } from 'helpers';

export type WorkshopReviewProps = {
  applicationId: number;
  applicationType: ApplicationType;
  formData: any;
};

interface ReviewQuestions {
  maxScore: number;
  label: string;
  name: string;
  tooltiptext?: string;
  descriptionList: string[];
  disabled?: boolean;
}

export const WorkshopReview: React.FC<WorkshopReviewProps> = ({
  applicationId,
  applicationType,
  formData,
}) => {
  const { applicationScores, handleSubmit, isLoading, loggedInUser } = useWorkshopReview(
    applicationId,
    applicationType,
  );

  const evaluationReviewQuestions =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM ? INFRASTRUCTURE_REVIEW_QUESTIONS : [];

  useEffect(() => {
    if (applicationType === ApplicationType.INFRASTRUCTURE_FORM && applicationScores) {
      const scoreValues = getInfrastructureAutomatedScores(formData);

      applicationScores.AAlandUseScore = scoreValues?.landUseScore || 0;
      applicationScores.AApopulationScore = scoreValues?.populationScore || 0;
      applicationScores.AAsafetyScore = scoreValues?.safetyScore || 0;
    }
  }, [applicationScores]);

  return (
    <>
      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <Formik
          initialValues={applicationScores}
          validationSchema={
            applicationType === ApplicationType.NETWORK_FORM
              ? INFRASTRUCTURE_REVIEW_VALIDATION_SCHEMA
              : ''
          }
          onSubmit={handleSubmit}
          enableReinitialize={true}
          key={applicationId}
        >
          {({ isValid }) => (
            <Form>
              <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
                <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
                  <div className='flex'>
                    <div className='w-1/2 p-2'>Workshop Evaluation Board</div>
                    <div className='w-1/2 flex justify-end'>
                      {loggedInUser?.isAdmin && (
                        <Button
                          variant='primary'
                          customClass='py-2 '
                          type='submit'
                          disabled={!isValid}
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
                        {evaluationReviewQuestions.map((item, index) => (
                          <div key={`BroderReviewInput_${index}`} className='py-5'>
                            <Input
                              descriptionList={item.descriptionList}
                              disabled={!loggedInUser?.isAdmin}
                              hiddenInput={item.hiddenInput}
                              label={item.label}
                              name={item.name}
                              tooltiptext={item.tooltiptext}
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
                        disabled={!loggedInUser?.isAdmin}
                      />
                      <FinalScore />

                      <div className='flex flex-1 w-full justify-start'>
                        <Radio
                          disabled={!loggedInUser?.isAdmin}
                          horizontal={true}
                          legend='Select status for your score on this application.'
                          name='completionStatus'
                          title='Status'
                          options={[
                            { label: 'In Progress', value: ReviewCompletionStatus.IN_PROGRESS },
                            { label: 'Completed', value: ReviewCompletionStatus.COMPLETE },
                          ]}
                        ></Radio>
                      </div>
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
