import { Field, FieldProps } from '@components';

export interface OptionType {
  label: string;
  value: string;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

export const Select: React.FC<FieldProps> = props => {
  const { name, label, disabled, description, children } = props;

  return (
    <Field name={name} label={label} description={description} disabled={disabled} as='select'>
      <option value={''} key={''} className='hidden'></option>
      {children}
    </Field>
  );
};

export const Option: React.FC<OptionType> = ({
  label,
  value,
  disabled,
  hidden,
  selected = false,
}) => {
  return (
    <option value={value} key={value} disabled={disabled} hidden={hidden} selected={selected}>
      {label}
    </option>
  );
};
