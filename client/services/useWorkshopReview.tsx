import { useState, useEffect } from 'react';
import { useHttp } from './useHttp';
import { toast } from 'react-toastify';

import {
  API_ENDPOINT,
  ApplicationType,
  INITIAL_INFRASTRUCTURE_REVIEW_VALUES,
  NETWORK_APP_INITIAL_REVIEW_VALUES,
  REQUEST_METHOD,
  ReviewCompletionStatus,
} from '../constants';
import { useAuthContext } from '../contexts';

export const useWorkshopReview = (applicationId: number, applicationType?: ApplicationType) => {
  const reviewValues =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? INITIAL_INFRASTRUCTURE_REVIEW_VALUES
      : NETWORK_APP_INITIAL_REVIEW_VALUES;

  const [applicationScores, setApplicationScores] = useState<any>(reviewValues);
  const { fetchData, sendApiRequest, isLoading } = useHttp();
  const [newScore, setNewScore] = useState<boolean>(true);
  const [scoreId, setScoreId] = useState<number>(0);
  const { user: loggedInUser } = useAuthContext();

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
            status: data?.completionStatus?.name,
          });
        } else {
          setApplicationScores(reviewValues);
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
    const { overallComments, finalScore, status = ReviewCompletionStatus.IN_PROGRESS, ...data } = values;

    const obj = { data, overallComments, finalScore, status };
    // calculate all score values for finalScore
    const total = Object.values(data);
    obj.finalScore = addScores(total);

    //TODO: Check if the user is submitting/saving their own review - if not throw error
    sendApiRequest(
      {
        endpoint: newScore
          ? API_ENDPOINT.getWorkshopScores(applicationId)
          : API_ENDPOINT.updateWorkshopScores(applicationId, scoreId),
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
    fetchApplicationScores,
    handleSubmit,
    isLoading,
    loggedInUser,
    setApplicationScores,
  };
};
