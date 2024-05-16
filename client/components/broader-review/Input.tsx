import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Field } from 'formik';
import { TooltipIcon } from '../generic';

export type ObjProps = {
  text: string;
  value: string;
};

export type InputProps = {
  description?: string;
  descriptionList?: string[];
  disabled: boolean;
  hiddenInput?: boolean;
  label?: string;
  name: string;
  secondaryList?: string[];
  tooltiptext?: string;
  maxScore?: number;
};

export const Input: React.FC<InputProps> = ({
  description,
  descriptionList,
  disabled,
  hiddenInput,
  label,
  name,
  secondaryList,
  tooltiptext,
  maxScore,
}) => {
  return (
    <div className='md:flex md:items-center'>
      <div className='md:w-3/4'>
        {label && (
          <div>
            <div>
              <span className='text-bcBluePrimary font-bold'>{label}</span>&nbsp;
              {tooltiptext && (
                <TooltipIcon icon={faQuestionCircle} text={tooltiptext} style='h-4 w-4' />
              )}
            </div>

            {description && <div className='text-bcBluePrimary'>{description}</div>}
          </div>
        )}

        {maxScore && !disabled && (
          <div className='flex items-center gap-1 py-2'>
            <span>Max score:</span> <strong>{maxScore}</strong>
          </div>
        )}

        {descriptionList && (
          <ul className='text-bcBluePrimary list-disc list-inside'>
            {descriptionList.map((item: string, index: number) => {
              return <li key={`ind-${item}-${index}`}>{item}</li>;
            })}
          </ul>
        )}

        {secondaryList && (
          <ul className='text-bcGray text-sm italic list-disc list-inside'>
            {secondaryList.map((item: string, index: number) => {
              return <li key={`ind-${item}-${index}`}>{item}</li>;
            })}
          </ul>
        )}
      </div>

      {!hiddenInput && (
        <div className='ml-4 w-14 -mt-2 md:w-1/4 ml-4'>
          <Field
            as='input'
            className={`w-14 text-center ${
              disabled ? 'bg-slate-100' : ''
            } BroderReviewInput border border-gray-400 bg-white pl-2 py-2 rounded`}
            disabled={disabled}
            name={name}
            type='number'
          />
        </div>
      )}
    </div>
  );
};
