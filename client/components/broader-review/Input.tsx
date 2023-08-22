import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Field } from 'formik';
import { TooltipIcon } from '../generic';

export type ObjProps = {
  text: string;
  value: string;
};

export type InputProps = {
  label?: string;
  name: string;
  tooltiptext?: string;
  description?: string;
  descriptionList?: string[];
  disabled: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  description,
  descriptionList,
  tooltiptext,
  disabled,
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
            {descriptionList && (
              <ul className='text-bcBluePrimary list-disc list-inside'>
                {descriptionList.map((item: string, index: number) => {
                  return <li key={`ind-${item}-${index}`}>{item}</li>;
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className='ml-4 w-14 -mt-2 md:w-1/4 ml-4'>
        <Field
          as='input'
          name={name}
          type='number'
          disabled={disabled}
          className={`w-14 text-center ${
            disabled ? 'bg-slate-100' : ''
          } BroderReviewInput border border-gray-400 bg-white pl-2 py-2 rounded`}
        />
      </div>
    </div>
  );
};
