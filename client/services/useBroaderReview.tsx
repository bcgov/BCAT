import { useState, useEffect } from 'react';
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
import { useHttp } from './useHttp';

export const useBroaderReview = (applicationId: number, applicationType?: ApplicationType) => {
  const reviewValues =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? INITIAL_INFRASTRUCTURE_REVIEW_VALUES
      : NETWORK_APP_INITIAL_REVIEW_VALUES;
  const [applicationScores, setApplicationScores] = useState<any[]>([]);
  const { fetchData, sendApiRequest, isLoading } = useHttp();
  const [selectedUser, setSelectedUser] = useState<number | undefined>();
  const [applicationScoresByScorer, setApplicationScoresByScorer] = useState<any>();
  const { user: loggedInUser } = useAuthContext();
  const [newScore, setNewScore] = useState<boolean>(true);
  const [scoreId, setScoreId] = useState<number>(0);
  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(true);

  const fetchApplicationScores = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getBroaderScores(applicationId),
      },
      (data: any) => {
        setApplicationScores(data);
      },
    );
  };

  // Check if scorer has already scored application
  const handleApplicationScoresByUser = () => {
    // If there are no entries in the database
    if (applicationScores?.length == 0 || !selectedUser) {
      setDefaultScoreValues();
      return;
    }

    // If there are entries in the database
    const singleScore = applicationScores.filter((item: any) => item.user == selectedUser);
    let data;
    if (singleScore.length > 0) {
      setScoreId(singleScore[0].id);
      setNewScore(false);
      data = singleScore[0];

      setApplicationScoresByScorer({
        ...reviewValues,
        ...(data?.data ?? {}),
        overallComments: data?.overallComments ?? '',
        finalScore: data?.finalScore,
        status: data?.completionStatus?.name,
      });
    } else {
      setDefaultScoreValues();
    }
  };

  const setDefaultScoreValues = () => {
    setApplicationScoresByScorer(reviewValues);
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
    const {
      overallComments,
      finalScore,
      status = ReviewCompletionStatus.IN_PROGRESS,
      ...data
    } = values;

    const obj = { data, overallComments, finalScore, status };
    // calculate all score values for finalScore
    const total = Object.values(data);
    obj.finalScore = addScores(total);

    //TODO: Check if the user is submitting/saving their own review - if not throw error
    sendApiRequest(
      {
        endpoint: newScore
          ? API_ENDPOINT.getBroaderScores(applicationId)
          : API_ENDPOINT.updateBroaderScores(applicationId, scoreId),
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

  const handleChangeScorer = (id: number) => {
    setSelectedUser(id);
  };

  useEffect(() => {
    handleApplicationScoresByUser();
  }, [applicationScores]);

  useEffect(() => {
    setIsLoggedInUser(loggedInUser?.id === selectedUser);
    handleApplicationScoresByUser();
  }, [selectedUser]);

  useEffect(() => {
    const id = loggedInUser && loggedInUser.id;
    setSelectedUser(id);
    if (applicationId) {
      fetchApplicationScores();
    }
  }, []);

  return {
    applicationScores,
    applicationScoresByScorer,
    fetchApplicationScores,
    handleChangeScorer,
    handleSubmit,
    isLoading,
    isLoggedInUser,
    loggedInUser,
    selectedUser,
    setApplicationScores,
  };
};
