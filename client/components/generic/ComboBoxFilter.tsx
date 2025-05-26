import React from 'react';

interface InputFilterProps {
  searchType: string | number | undefined;
  onChange: any;
  placeholder: string;
  datalistId?: string;
}

interface SelectFilterProps extends InputFilterProps {
  options: { name: string; value: string }[];
}

const ComboBoxFilter: React.FC<SelectFilterProps> = ({
  searchType,
  onChange,
  placeholder,
  options,
  datalistId,
}) => {
  // Use a unique datalist id for each ComboBoxFilter instance
  const id = datalistId || `${placeholder.replace(/\s+/g, '')}Options`;
  return (
    <div className='relative'>
      <input
        type='text'
        list={id}
        className='bg-white rounded border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        onChange={onChange}
        value={searchType}
      />
      <datalist id={id}>
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default ComboBoxFilter;
