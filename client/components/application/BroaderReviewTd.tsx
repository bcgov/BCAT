import { Tooltip } from 'react-tooltip';

import { ReviewCompletionStatus } from '@constants';
import type { BroaderReviewScoreTd } from 'constants/interfaces';

type Props = {
  broaderReviews: BroaderReviewScoreTd[];
  index: number;
};

type BroaderReviewSummaryProps = Props & {
  status: ReviewCompletionStatus;
};

const BroaderReviewSummary = ({ broaderReviews, status, index }: BroaderReviewSummaryProps) => {
  const title = status === ReviewCompletionStatus.IN_PROGRESS ? 'In Progress' : 'Completed';
  const tooltipId = `broader-review-tooltip-${status}-${index}`;
  return (
    <div className='flex'>
      <a
        className={`rounded px-2 ml-2 text-xs ${
          status == ReviewCompletionStatus.COMPLETE ? 'bg-bcGreenSuccess' : 'bg-slate-400'
        } py-1 text-white`}
        data-tooltip-id={tooltipId}
      >
        <div className='flex flex-col gap-2 justify-center'>
          <p className='border-b-2'>{title}</p>
          <p className='flex items-center justify-center'>{broaderReviews.length}</p>
        </div>
      </a>
      <Tooltip id={tooltipId}>
        <div className='flex flex-col'>
          {broaderReviews.length > 0 ? (
            broaderReviews.map(({ user }) => (
              <span key={`${tooltipId}-${user?.id}`}>{user?.displayName}</span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      </Tooltip>
    </div>
  );
};
const BroaderReviewTd = ({ broaderReviews, index }: Props) => {
  const inProgressReviews = broaderReviews.filter(
    review => review?.completionStatus?.name === ReviewCompletionStatus.IN_PROGRESS,
  );
  const completeReviews = broaderReviews.filter(
    review => review?.completionStatus?.name === ReviewCompletionStatus.COMPLETE,
  );

  return (
    <div className='flex items-center lg:flex-row flex-col gap-2 lg:gap-0'>
      <BroaderReviewSummary
        broaderReviews={inProgressReviews}
        index={index}
        status={ReviewCompletionStatus.IN_PROGRESS}
      />
      <BroaderReviewSummary
        broaderReviews={completeReviews}
        index={index}
        status={ReviewCompletionStatus.COMPLETE}
      />
    </div>
  );
};

export default BroaderReviewTd;
