import { toast } from 'react-toastify';

import { API_ENDPOINT, REQUEST_METHOD } from '../../constants';
import { Button, Spinner } from '../generic';
import { useAuthContext } from '../../contexts';
import { useHttp } from '../../services';

export const DataSyncForm: React.FC<any> = () => {
  const { user } = useAuthContext();
  const { sendApiRequest, isLoading } = useHttp();

  if (!user?.isAdmin) return <></>;

  const syncChefsData = () => {
    sendApiRequest(
      {
        endpoint: API_ENDPOINT.syncChefsData,
        method: REQUEST_METHOD.POST,
      },
      () => {
        toast.success('Application table is updated!');
      },
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <div className='flex space-x-16 py-5'>
          <Button variant='primary' onClick={syncChefsData}>Sync CHEFS applications</Button>
          <Button variant='primary'>Sync CHEFS attachments</Button>
        </div>
      )}
    </>
  );
};
