import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ApplicationTableProps } from '../../constants/interfaces';
import { formatDate } from 'utils';
import BroaderReviewTd from 'components/application/BroaderReviewTd';

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
  FUNDING_YEAR = 'fundingYear',
  APPLICANT_NAME = 'applicantName',
  APPLICATION_TYPE_NAME = 'applicationType.name',
  TOTAL_ESTIMATED_COST = 'totalEstimatedCost',
  ASKS = 'asks',
  ASSIGNED_TO_DISPLAYNAME = 'assignedTo.displayName',
  STATUS_NAME = 'status.name',
  PROJECT_TITLE = 'projectTitle',
}

const TableHeader: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const currentSort: OrderBy | '' = (query.orderBy as OrderBy) || '';
  const sortOrder: Order | undefined = (query.order as Order) || undefined;

  const handleSort = (field: string) => {
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
    sortable?: boolean;
  };

  const columns: Column[] = [
    { name: 'Confirmation ID', field: 'confirmationId', sortable: true },
    { name: 'Funding Year', field: 'fundingYear', sortable: true },
    { name: 'Applicant Name', field: 'applicantName', sortable: true },
    { name: 'Application Type', field: 'applicationType.name', sortable: true },
    { name: 'Project Title', field: 'projectTitle', sortable: true },
    { name: 'Estimated Cost', field: 'totalEstimatedCost', sortable: true },
    { name: 'Asks', field: 'asks', sortable: true },
    { name: 'Assigned to', field: 'assignedTo.displayName', sortable: true },
    { name: 'Reviewers', field: 'broaderReviewScores', sortable: false },
    { name: 'Last Updated', field: 'updatedAt', sortable: true },
    { name: 'Status', field: 'status.name', sortable: true },
  ];
  const tdStyles =
    'table-td table-header px-6 py-4 text-left text-sm font-strong border-b-2  border-bcYellowWarning';

  const thStyles = (sortable: Column['sortable']) =>
    sortable ? `${tdStyles} cursor-pointer` : tdStyles;

  const headers = useMemo(() => {
    return columns.map(({ name, field, sortable }) => (
      <th key={field} className={thStyles(sortable)} onClick={() => sortable && handleSort(field)}>
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
              <td className={tdStyles}>
                <BroaderReviewTd broaderReviews={row.broaderReviewScores} index={index} />
              </td>
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
