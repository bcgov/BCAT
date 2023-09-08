import { useAuthContext } from '../../contexts';
import { Button } from '../generic/Button';

export const DataSyncForm: React.FC<any> = () => {
  const { user } = useAuthContext();

  if (!user?.isAdmin) return <></>;

  return (
    <div className='flex space-x-16 py-5'>
      <Button variant='primary'>Sync CHEFS applications</Button>
      <Button variant='primary'>Sync CHEFS attachments</Button>
    </div>
  );
};
