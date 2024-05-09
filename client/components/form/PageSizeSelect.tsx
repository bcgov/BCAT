import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { SetQueryParams } from 'services/useQueryParams';

const PageSizeSelect = () => {
  const router = useRouter();
  const { query, push } = router;
  const { limit } = query;

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    SetQueryParams(push, query, { ...query, limit: event.target.value });
  };

  const limits = [
    { name: 'All', value: '0' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '40', value: '40' },
    { name: '50', value: '50' },
  ];
  return (
    <div>
      <select
        value={limit}
        title='page size select'
        onChange={handlePageSizeChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      >
        {limits.map(({ name, value }) => (
          <option value={value} key={value} selected={limit === value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelect;
