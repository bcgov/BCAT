import {
  ApplicationType,
  INFRASTRUCTURE_REVIEW_QUESTIONS,
  NETWORK_REVIEW_QUESTIONS,
} from '../constants';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BroaderReviewScore, ScoreSummaryTableProps } from 'constants/interfaces';
import { useApplicationDetails, useBroaderReview } from 'services';
import { TooltipIcon } from './generic';

export interface TableHeaderProps {
  scores: BroaderReviewScore[];
}

export interface TableBodyProps extends TableHeaderProps {
  applicationType: ApplicationType | undefined;
}

const TableHeader: React.FC<TableHeaderProps> = ({ scores }) => {
  const nameHeaders = scores.map((score: BroaderReviewScore) => score.displayName);
  const headers = ['Question', ...nameHeaders];
  const tdStyles =
    'table-td table-header px-6 py-4 text-left text-sm font-strong border-b-2  border-bcYellowWarning';
  return (
    <thead className='border-b bg-bcGrayInput table-header sticky top-0'>
      <tr>
        {headers &&
          headers.map((title: string, index: number) => (
            <th key={`th${index}`} className={tdStyles}>
              {title}
            </th>
          ))}
      </tr>
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ scores, applicationType }) => {
  const tdStyles =
    'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';
  const trStyles = 'bg-white border-b-2 even:bg-bcGrayInput border-gray-200';
  const summaryAppendix = [
    {
      name: 'overallComments',
      label: 'Overall Comments',
      tooltiptext: 'Your overall feedback for the project.',
    },
    { name: 'finalScore', label: 'Final Score', tooltiptext: 'Your final score for the project' },
  ];

  const evaluationReviewQuestions =
    applicationType === ApplicationType.INFRASTRUCTURE_FORM
      ? INFRASTRUCTURE_REVIEW_QUESTIONS
      : NETWORK_REVIEW_QUESTIONS;

  const finalMaxScore = evaluationReviewQuestions
    .map((item: any) => item.maxScore)
    .reduce((accumulator, current) => accumulator + current);

  const getScoreValue = (key: string, score: any) => {
    const automatedScore = score.data[`AA${key}`] || 0;
    return score.data[key] + automatedScore;
  };

  return (
    <tbody>
      {evaluationReviewQuestions.map((item: any, index) => {
        return (
          <tr key={`row-${index}`} className={trStyles}>
            <td className={`${tdStyles} w-1/5`}>
              <div className='flex items-center justify-between'>
                <p className='font-bold'>Question {index + 1}&nbsp;&nbsp;</p>
                {item.tooltiptext && (
                  <TooltipIcon icon={faQuestionCircle} text={item.tooltiptext} style='h-4 w-4' />
                )}
              </div>
              <p className='text-xs text-bcGray font-normal'>{item.label}</p>
            </td>

            {scores &&
              scores.map((score: any, index: number) => (
                <td key={`score-${index}`} className={tdStyles}>
                  {`${getScoreValue(item.name, score)}/${item.maxScore}`}
                </td>
              ))}
          </tr>
        );
      })}
      {summaryAppendix.map((item, index) => {
        return (
          <tr key={`appendix-${index}`} className={trStyles}>
            <td className={`${tdStyles} w-1/5`}>
              <div className='flex items-center justify-between'>
                <p className='font-bold'>{item.label}&nbsp;&nbsp;</p>
                {item.tooltiptext && (
                  <TooltipIcon icon={faQuestionCircle} text={item.tooltiptext} style='h-4 w-4' />
                )}
              </div>
            </td>

            {scores &&
              scores.map((score: any, index: number) => (
                <td key={`appendix-score-${index}`} className={`${tdStyles} font-semibold`}>
                  {item.name === 'finalScore'
                    ? `${score[item.name]}/${finalMaxScore}`
                    : `${score[item.name]}`}
                </td>
              ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export const ScoreSummaryTable: React.FC<ScoreSummaryTableProps> = ({ applicationId }) => {
  const { applicationType } = useApplicationDetails(applicationId);
  const { applicationScores } = useBroaderReview(applicationId, applicationType);

  return (
    <div>
      {applicationScores && applicationScores.length != 0 ? (
        <table className='min-w-full text-center'>
          <TableHeader scores={applicationScores} />
          <TableBody scores={applicationScores} applicationType={applicationType} />
        </table>
      ) : (
        <div className='text-center text-sm mt-4'>No scores found.</div>
      )}
    </div>
  );
};
