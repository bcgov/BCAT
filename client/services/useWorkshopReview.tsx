import { useState, useEffect } from 'react';
import {
  API_ENDPOINT,
  ApplicationType,
  INITIAL_INFRASTRUCTURE_REVIEW_VALUES,
  REQUEST_METHOD,
} from '../constants';
import { useHttp } from './useHttp';
import { toast } from 'react-toastify';
import {
  API_ENDPOINT,
  ApplicationType,
  INITIAL_REVIEW_VALUES,
  NETWORK_APP_INITIAL_REVIEW_VALUES,
  REQUEST_METHOD,
} from '../constants';
import { useHttp } from './useHttp';
import { useAuthContext } from '../contexts';
import { BroaderReviewValues, NetworkBroaderReviewValues } from 'constants/interfaces';

export const useWorkshopReview = (applicationId: number, applicationType?: ApplicationType) => {
  const reviewValues =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? INITIAL_INFRASTRUCTURE_REVIEW_VALUES
      : {};
  const [applicationScores, setApplicationScores] = useState<any>(reviewValues);
  const { fetchData, sendApiRequest, isLoading } = useHttp();
  const [newScore, setNewScore] = useState<boolean>(true);
  const [scoreId, setScoreId] = useState<number>(0);
  const { user: loggedInUser } = useAuthContext();

  const [reviewValues, setReviewValues] = useState<
    BroaderReviewValues | NetworkBroaderReviewValues
  >();

  useEffect(() => {
    //TODO: add infrastructure review initial values
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? setReviewValues(INITIAL_REVIEW_VALUES)
      : setReviewValues(NETWORK_APP_INITIAL_REVIEW_VALUES);
  }, [applicationType]);

  const fetchApplicationScores = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getWorkshopScores(applicationId),
      },
      (data: any) => {
        if (data.length === 1) {
          // If there are entries in the database
          data = data[0];
          setScoreId(data.id);
          setNewScore(false);

          setApplicationScores({
            ...reviewValues,
            ...(data?.data ?? {}),
            overallComments: data?.overallComments ?? '',
            finalScore: data?.finalScore,
            completionStatus: data?.completionStatus,
          });
        } else {
          setApplicationScores({ ...reviewValues });
        }
      },
    );
  };

  function addScores(array: any) {
    let sum = 0;
    array.forEach((item: any) => {
      if (Number.isInteger(item)) {
        sum += Number(item);
      }
    });
    return sum;
  }

  const handleSubmit = (values: any) => {
    const { overallComments, finalScore, completionStatus, ...data } = values;

    const obj = { data, overallComments, finalScore, completionStatus };
    // calculate all score values for finalScore
    const total = Object.values(data);
    obj.finalScore = addScores(total);

    //TODO: Check if the user is submitting/saving their own review - if not throw error
    sendApiRequest(
      {
        endpoint: newScore
          ? API_ENDPOINT.getWorkshopScores(applicationId)
          : API_ENDPOINT.updateWorksopScores(applicationId, scoreId),
        method: newScore ? REQUEST_METHOD.POST : REQUEST_METHOD.PATCH,
        data: obj,
      },
      () => {
        toast.success('Scores updated successfully!');
        // update score with new data
        fetchApplicationScores();
      },
    );
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplicationScores();
    }
  }, []);

  return {
    applicationScores,
    setApplicationScores,
    fetchApplicationScores,
    handleSubmit,
    isLoading,
    loggedInUser,
  };
};
