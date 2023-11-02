import { Button, ApplicationTable, Spinner } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useHttp } from '../../services/useHttp';
import { SetQueryParams } from '../../services/useQueryParams';
import { useRouter } from 'next/router';
import { API_ENDPOINT } from '../../constants';
import { useDownloadXlsx } from 'services/useDownloadXlsx';

interface InputFilterProps {
  searchType: any;
  onChange: any;
  placeholder: string;
}

const InputFilter: React.FC<InputFilterProps> = ({ searchType, onChange, placeholder }) => {
  return (
    <input
      type='text'
      className='bg-white rounded border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      placeholder={placeholder}
      onChange={onChange}
      value={searchType}
    />
  );
};

export const ApplicationDashboard: React.FC<any> = () => {
  const [state, setState] = useState({
    data: [],
    searchApplicantName: '',
    searchApplicationType: '',
    searchAssignedTo: '',
    searchConfirmationID: '',
    searchTotalCost: '',
    totalApplications: 0,
  });

  const [isDataLoading, setIsDataLoading] = useState(false);

  const {
    searchApplicantName,
    searchApplicationType,
    searchAssignedTo,
    searchConfirmationID,
    searchTotalCost,
    totalApplications,
    data,
  } = state;

  const { push, query } = useRouter();
  const router = useRouter();
  const { fetchData, isLoading } = useHttp();
  const { page, limit } = query;

  const setApplicationData = async (params: any) => {
    fetchData(
      {
        endpoint: API_ENDPOINT.APPLICATIONS,
        params,
      },
      ({ result, total }: any) => {
        if (router.isReady) {
          setState(state => ({ ...state, data: result, totalApplications: total }));
        }
      },
    );
  };

  useEffect(() => {
    (async () => {
      const params = { ...query, page: 1, limit: 20 };
      SetQueryParams(push, query, params);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Object.keys(query).length === 0) return;
      setApplicationData(query);
    })();
  }, [query]);

  // Change pages
  const nextPage = () => {
    if (!totalApplications || Number(page) == Math.ceil(totalApplications / Number(limit))) return;
    const params = { ...query, page: Number(page) + 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const previousPage = () => {
    if (Number(page) == 1) return;
    const params = { ...query, page: Number(page) - 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const firstPage = () => {
    if (Number(page) == 1) return;
    const params = { ...query, page: 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const lastPage = () => {
    if (!totalApplications || Number(page) == Math.ceil(totalApplications / Number(limit))) return;
    const params = {
      ...query,
      page: Math.ceil(totalApplications / Number(limit)),
      limit: Number(limit),
    };
    SetQueryParams(push, query, params);
  };

  const filterHasNoValues = () => {
    const noValues =
      searchApplicantName.length === 0 &&
      searchApplicationType.length === 0 &&
      searchAssignedTo.length === 0 &&
      searchConfirmationID.length == 0 &&
      searchTotalCost.length === 0;

    return noValues;
  };

  const handleFilter = () => {
    if (filterHasNoValues()) return;

    const params = {
      ...query,
      applicantName: searchApplicantName,
      applicationType: searchApplicationType,
      assignedTo: searchAssignedTo,
      confirmationId: searchConfirmationID,
      totalCost: searchTotalCost,
    };

    SetQueryParams(push, query, params);
  };

  const handleClear = () => {
    // Clear Inputs
    setState(state => ({
      ...state,
      searchApplicantName: '',
      searchApplicationType: '',
      searchAssignedTo: '',
      searchConfirmationID: '',
      searchTotalCost: '',
    }));
    const params = {
      ...query,
      applicantName: '',
      applicationType: '',
      assignedTo: '',
      confirmationId: '',
      totalCost: '',
      limit: Number(limit),
    };
    SetQueryParams(push, query, params);
  };

  const { downloadXlsx, downloadCountXlsx } = useDownloadXlsx();

  const downloadXlsxData = async () => {
    setIsDataLoading(true);
    await downloadXlsx();
    await downloadCountXlsx();
    setIsDataLoading(false);
  };

  return (
    <div>
      <div className='w-full bg-white flex my-2 justify-between'>
        <h1 className='text-2xl font-bold h-6 text-bcBluePrimary text-left flex-col items-start'>
          Applications
        </h1>
        <Button
          variant='primary'
          customClass='py-2'
          onClick={downloadXlsxData}
          disabled={isDataLoading}
        >
          Download Raw Data
        </Button>
      </div>

      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <>
          <div className='w-full border py-4 px-8 mb-2'>
            Filter By:
            <div className='grid grid-cols-4 gap-1'>
              <InputFilter
                placeholder='Confirmation ID'
                onChange={(e: any) =>
                  setState(p => ({ ...p, searchConfirmationID: e.target.value }))
                }
                searchType={searchConfirmationID}
              />

              <InputFilter
                placeholder='Applicant Name'
                onChange={(e: any) =>
                  setState(p => ({ ...p, searchApplicantName: e.target.value }))
                }
                searchType={searchApplicantName}
              />

              <InputFilter
                placeholder='Application Type'
                onChange={(e: any) =>
                  setState(p => ({ ...p, searchApplicationType: e.target.value }))
                }
                searchType={searchApplicationType}
              />

              <InputFilter
                placeholder='Estimated Cost'
                onChange={(e: any) => setState(p => ({ ...p, searchTotalCost: e.target.value }))}
                searchType={searchTotalCost}
              />

              <InputFilter
                placeholder='Assigned To'
                onChange={(e: any) => setState(p => ({ ...p, searchAssignedTo: e.target.value }))}
                searchType={searchAssignedTo}
              />

              <div className='grid grid-cols-2 gap-1'>
                <Button onClick={handleFilter} variant='primary' disabled={filterHasNoValues()}>
                  <FontAwesomeIcon icon={faFilter} className='h-4 mr-2' />
                  Filter Records
                </Button>
                <Button onClick={handleClear} variant='outline'>
                  <FontAwesomeIcon icon={faTimes} className='h-4 mr-2' />
                  Clear Filter
                </Button>
              </div>
            </div>
          </div>

          {data && <ApplicationTable applications={data} />}

          <Pagination
            currentPage={Number(page)}
            applicationsPerPage={Number(limit)}
            totalApplications={totalApplications}
            firstPage={firstPage}
            lastPage={lastPage}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </>
      )}
    </div>
  );
};
