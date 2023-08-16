import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import {
  API_ENDPOINT,
  ApplicationStatus,
  ApplicationType,
  NextStatusUpdates,
  REQUEST_METHOD,
  Routes,
} from '../constants';
import { KeyValuePair } from '../constants/interfaces';
import { downloadHtmlAsPdf } from '../constants/util';
import { UserInterface } from '../contexts';
import { NEXT_PUBLIC_INFRASTRUCTURE_PROJECT, NEXT_PUBLIC_NETWORK_PROJECT } from '../pages/_app';
import { useHttp } from './useHttp';
import { useTeamManagement } from './useTeamManagement';

type ApplicationFormResponseType = {
  versionSchema: { components: [] };
};

type ApplicationDetailsType = KeyValuePair & {
  projectTitle: string;
  confirmationId: string;
  lastUpdatedBy?: UserInterface;
  assignedTo?: UserInterface;
  status: ApplicationStatus;
  totalEstimatedCost: string;
  asks: string;
  updatedAt: string;
};

export type ApplicationDetailsResponseType = ApplicationDetailsType & {
  form: ApplicationFormResponseType;
  submission: KeyValuePair;
};

export const useApplicationDetails = (id: number | number[] | undefined) => {
  const { replace } = useRouter();

  const { fetchData, sendApiRequest } = useHttp();
  const { userData } = useTeamManagement();
  // const { user } = useAuthContext();
  const [applicationType, setApplicationType] = useState<ApplicationType | undefined>();

  const findApplicationType = (data: any): ApplicationType => {
    switch (data?.form?.chefsFormId) {
      case NEXT_PUBLIC_INFRASTRUCTURE_PROJECT:
        return ApplicationType.INFRASTRUCTURE_FORM;

      case NEXT_PUBLIC_NETWORK_PROJECT:
        return ApplicationType.NETWORK_FORM;

      default:
        return ApplicationType.INFRASTRUCTURE_FORM;
    }
  };

  const topStatusObj = [
    { title: 'Status', value: 'status' },
    { title: 'Estimated cost', value: 'totalEstimatedCost' },
    { title: 'Asks', value: 'asks' },
    { title: 'Last updated', value: 'updatedAt' },
    { title: 'Updated by', value: `lastUpdatedBy` },
  ];

  const getApplicationById = (id: number): Promise<ApplicationDetailsResponseType> => {
    return new Promise<ApplicationDetailsResponseType>(resolve => {
      fetchData(
        {
          endpoint: API_ENDPOINT.getApplicationDetails(id),
        },
        (data: ApplicationDetailsResponseType) => {
          resolve(data);
        },
      );
    }).then(data => {
      return data;
    });
  };

  const { data } = useSWR(id?.toString(), (id: number) => getApplicationById(id));

  const [schema, setSchema] = useState<any[]>([]);
  const [formData, setFormData] = useState<KeyValuePair | undefined>();
  const [details, setDetails] = useState<ApplicationDetailsType | undefined>();
  const [showComments, setShowComments] = useState<boolean>(false);

  const updateStatus = (id: number, status: ApplicationStatus) => {
    sendApiRequest(
      {
        endpoint: API_ENDPOINT.getApplicationStatus(id),
        data: { status },
        method: REQUEST_METHOD.PATCH,
      },
      () => {
        toast.success('Status update successful!!!');
        replace(Routes.HOME);
      },
    );
  };

  const getNextStatusUpdates = (id: number, status: ApplicationStatus) => {
    const statusUpdates = [];

    // TODO: confirm logic for updating statuses
    switch (status) {
      case ApplicationStatus.RECEIVED:
        // if (user?.isAdmin) {
        statusUpdates.push({
          label: NextStatusUpdates.PROCEED,
          onClick: () => updateStatus(id, ApplicationStatus.ASSIGNED),
        });
        statusUpdates.push({
          label: NextStatusUpdates.DISCARD,
          onClick: () => updateStatus(id, ApplicationStatus.DENIED),
        });
        // }
        break;

      case ApplicationStatus.ASSIGNED:
        statusUpdates.push({
          label: NextStatusUpdates.PROCEED,
          onClick: () => updateStatus(id, ApplicationStatus.WORKSHOP),
        });
        statusUpdates.push({
          label: NextStatusUpdates.DISCARD,
          onClick: () => updateStatus(id, ApplicationStatus.DENIED),
        });
        break;

      case ApplicationStatus.WORKSHOP:
      default:
        // TODO: Logic after workshop process
        statusUpdates.push({
          label: NextStatusUpdates.PROCEED,
          onClick: () => updateStatus(id, ApplicationStatus.APPROVED),
        });
        break;
    }

    return statusUpdates;
  };

  const updateEvaluator = (data: UserInterface) => {
    if (id && typeof id === 'string') {
      sendApiRequest(
        {
          endpoint: API_ENDPOINT.getApplicationEvaluator(id),
          data: { userId: data.id },
          method: REQUEST_METHOD.PATCH,
        },
        () => {
          toast.success('Evaluator updated successfully!!!');
        },
      );
    }
  };

  const isPanelDefaultOpen = (index: number, status: string, title: string): boolean => {
    if (status === ApplicationStatus.ASSIGNED) {
      return title === 'Funding and Project Cost Estimate Information';
    }

    return index === 0;
  };

  const downloadPDF = () => {
    if (id && typeof id === 'string') {
      fetchData(
        {
          endpoint: API_ENDPOINT.downloadApplicationScore(id),
        },
        (data: any) => {
          downloadHtmlAsPdf(data);
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      const { form, submission, ...submissionDetails } = data;
      const filteredComponents: any = form?.versionSchema?.components.filter(
        (i: any) => i.type === 'panel',
      );
      const sections = filteredComponents.filter((c: any) =>
        c.components.filter((i: any) => i.type === 'container'),
      );

      setSchema(sections);
      setFormData(submission);
      setDetails(submissionDetails);
      setApplicationType(findApplicationType(data));
    }
  }, [data]);

  return {
    topStatusObj,
    schema,
    formData,
    details,
    showComments,
    setShowComments,
    getNextStatusUpdates,
    updateEvaluator,
    userList: userData,
    isPanelDefaultOpen,
    applicationType,
    downloadPDF,
  };
};
