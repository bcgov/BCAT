import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ApplicationTableProps } from '../../constants/interfaces';
import { formatDate } from 'utils';

type Props = { applications: ApplicationTableProps[] };
enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum OrderBy {
  CONFIRMATION_ID = 'confirmationId',
  ASSIGNED_TO = 'assignedTo',
  STATUS = 'status',
  SUBMISSION_ID = 'submissionId',
  UPDATED_AT = 'updatedAt',
}

const TableHeader: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const currentSort: OrderBy | '' = (query.orderBy as OrderBy) || '';
  const sortOrder: Order | undefined = (query.order as Order) || undefined;

  const handleSort = (field: string) => {
    // const order = (field === currentSort && sortOrder === Order.ASC) ? Order.DESC : Order.ASC;
    let order: Order | undefined = Order.ASC;
    if (field === currentSort && sortOrder === Order.ASC) {
      order = Order.DESC;
    } else if (field === currentSort && sortOrder === Order.DESC) {
      order = undefined;
    }
    const newQuery = { ...query };
    if (order) {
      newQuery.orderBy = field;
      newQuery.order = order;
    } else {
      delete newQuery.orderBy;
      delete newQuery.order;
    }
    router.push({ query: newQuery });
  };

  const getSortIcon = (field: string) => {
    if (field === currentSort) {
      return sortOrder === Order.ASC ? '↑' : sortOrder === Order.DESC ? '↓' : '';
    }
    return '';
  };

  type Column = {
    name: string;
    field: string;
  };

  const columns: Column[] = [
    { name: 'Confirmation ID', field: 'confirmationId' },
    { name: 'Funding Year', field: 'fundingYear' },
    { name: 'Applicant Name', field: 'applicantName' },
    { name: 'Application Type', field: 'applicationType.name' },
    { name: 'Project Title', field: 'projectTitle' },
    { name: 'Estimated Cost', field: 'totalEstimatedCost' },
    { name: 'Asks', field: 'asks' },
    { name: 'Assigned to', field: 'assignedTo.displayName' },
    { name: 'Last Updated', field: 'updatedAt' },
    { name: 'Status', field: 'status.name' },
  ];
  const tdStyles =
    'table-td table-header cursor-pointer px-6 py-4 text-left text-sm font-strong border-b-2  border-bcYellowWarning';

  const headers = useMemo(() => {
    return columns.map(({ name, field }) => (
      <th key={field} className={tdStyles} onClick={() => handleSort(field)}>
        {name} {getSortIcon(field)}
      </th>
    ));
  }, [columns, currentSort, sortOrder]);
  return (
    <thead className='border-b bg-bcGrayInput table-header'>
      <tr>{headers}</tr>
    </thead>
  );
};

const TableBody: React.FC<Props> = data => {
  const tdStyles =
    'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';

  return (
    <tbody>
      {data.applications &&
        data.applications.map((row: any, index: number) => (
          <Link href={`applications/${row.id}`} key={`row${index}`}>
            <tr
              className='bg-white border-b-2 even:bg-bcGrayInput
              border-gray-200 cursor-pointer'
            >
              <td className={tdStyles}>{row.confirmationId}</td>
              <td className={tdStyles}>{row.fundingYear}</td>
              <td className={tdStyles}>{row.applicantName}</td>
              <td className={tdStyles}>{row.applicationType ? row.applicationType.name : '-'}</td>
              <td className={tdStyles}>{row.projectTitle}</td>
              <td className={tdStyles}>{row.totalEstimatedCost}</td>
              <td className={tdStyles}>{row.asks}</td>
              <td className={tdStyles}>{row.assignedTo ? row.assignedTo.displayName : '-'}</td>
              <td className={tdStyles}>{formatDate(row.updatedAt)}</td>
              <td className={tdStyles}>{row.status ? row.status.name : '-'}</td>
            </tr>
          </Link>
        ))}
    </tbody>
  );
};

export const ApplicationTable: React.FC<Props> = data => {
  return (
    <div>
      {data && data.applications.length != 0 ? (
        <table className='min-w-full text-center'>
          <TableHeader />
          <TableBody applications={data.applications} />
        </table>
      ) : (
        <div className='text-center text-sm mt-4'>No applications found.</div>
      )}
    </div>
  );
};
