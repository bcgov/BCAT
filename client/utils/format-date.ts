import dayjs from 'dayjs';

export const formatDate = (value: string) => {
  if (!value) {
    return;
  }

  // dayjs isValid accepts any numbers we send back as unix timestamps
  // so it converts, population, currency etc.

  // need to use regex to check for date strings
  // ^ matches beginning of string
  // \d{4} matches 4 digits (YYYY)
  // \d{2} matches 2 digits (MM and DD)
  // (.*) remaining sequence, needed to add to prevent exact match to YYYY-MM-DD
  const isDate = /^\d{4}-\d{2}-\d{2}(.*)/.test(value);

  if (!isDate) {
    return value;
  }

  return dayjs(value).format('YYYY-MM-DD');
};
