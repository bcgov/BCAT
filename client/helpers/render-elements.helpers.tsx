import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { Button } from '@components';
import { API_ENDPOINT } from '../constants';
import { formatDate } from 'utils';

const NO_DATA_LABEL = '-';

// array of simple types that can use basic renderGeneralField
const SIMPLE_TYPES = [
  'currency',
  'day',
  'phoneNumber',
  'select',
  'simplecurrencyadvanced',
  'simpledatetimeadvanced',
  'simpleemail',
  'simpleemailadvanced',
  'simplenumber',
  'simplenumberadvanced',
  'simplephonenumber',
  'simplephonenumberadvanced',
  'simpletextarea',
  'simpletextareaadvanced',
  'simpletextfield',
  'simpletextfieldadvanced',
  'textarea',
  'textfield',
];

// array of types such as banners, info, headings etc.
const NOT_TO_BE_RENDERED = ['button', 'htmlelement', 'simplebuttonadvanced', 'simplecontent'];

const HTML_TO_BE_RENDERED = [
  '<p>33. Identify which additional safety measures exist within the design of your project:</p>',
];

const MISC_LABELS_TO_REMOVE = ['Text/Images'];

const checkIfGridHasValues = (gridData: any) => {
  for (const value of gridData) {
    if (Object.values(value).some((item: any) => !!item)) {
      return true;
    }
  }

  return false;
};

// some questions require wording changes on FE,
// addYear is a custom key containing specific years to add from current year
// portalWording is a custom key containing the updated wording added by us, sent from CHEFS
const getLabel = (component: any) => {
  let label = component.properties?.portalWording ?? component.label;
  if (component.properties?.addYear) {
    const yearsToAdd = +component.properties?.addYear;
    label += ` ${dayjs().add(yearsToAdd, 'year').format('YYYY')}`;
  }
  return label;
};

const getValue = (componentKey: string, data: any, dataVal?: any) => {
  if (dataVal !== undefined && dataVal !== NO_DATA_LABEL) return dataVal;

  for (const [key, value] of Object.entries(data)) {
    if (key === componentKey) {
      dataVal = value;
      break;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      dataVal = getValue(componentKey, value, dataVal);
    }
  }
  return dataVal || NO_DATA_LABEL;
};

const renderCheckbox = (e: any, data: any) => {
  const label = getLabel(e);
  let value = getValue(e.key, data);

  if (value && value !== NO_DATA_LABEL) {
    value = 'Yes';
  }

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${value}`}</span>
    </div>
  );
};

const renderCountTable = (e: any, data: any) => {
  return e.rows?.map((r: any) => renderGeneralField(r[1].components[0], data));
};

const renderColumns = (e: any, data: any, fetchData?: any) => {
  return e.columns?.map((col: any) => {
    return col.components?.map((component: any) => {
      return renderElementType(component, data, fetchData);
    });
  });
};

const renderFieldSet = (e: any, data: any, fetchData?: any) => {
  return (
    <React.Fragment key={e.id}>
      {e.legend && (
        <span className='col-span-2 underline text-black text-xl font-bold capitalize'>
          {e.legend}
        </span>
      )}

      {e.components?.map((c: any) => {
        return renderElementType(c, data, fetchData);
      })}
    </React.Fragment>
  );
};

const renderChildComponents = (e: any, data: any, fetchData?: any) => {
  return e.components?.map((c: any) => {
    return renderElementType(c, data, fetchData);
  });
};

const renderFile = (e: any, data: any, fetchData: any) => {
  const files = getValue(e.key, data);
  const label = getLabel(e);

  if (!files) return;

  const downloadFile = (data: any) => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getApplicationAttachments(data.data.id),
        responseType: 'blob',
      },
      (response: any) => {
        const href = URL.createObjectURL(response);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${data.originalName}`); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      },
    );
  };

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      {files.length === 1 ? (
        <Button variant='link' customClass='text-left' onClick={() => downloadFile(files[0])}>
          {files[0]['originalName']}
        </Button>
      ) : (
        NO_DATA_LABEL
      )}
    </div>
  );
};

const renderGeneralField = (e: any, data: any) => {
  if (MISC_LABELS_TO_REMOVE.includes(e.label)) {
    return;
  }

  const value = getValue(e.key, data);
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span className='overflow-auto' key={e.key}>
        {(e.type === 'currency' || e.type === 'simplecurrencyadvanced') && 'CA$'}
        {`${formatDate(value) || NO_DATA_LABEL}`}
      </span>
    </div>
  );
};

const renderNoTypeFound = (e: any, data: any) => {
  return (
    <React.Fragment key={`e-${e.id}`}>
      <h3> Not a simple component {e.type}</h3>
      <h3>{e.key}</h3>
      <h3>{JSON.stringify(data[e.key])}</h3>
    </React.Fragment>
  );
};

const renderRadioValue = (e: any, data: any) => {
  const label = getLabel(e);
  const value = getValue(e.key, data);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${
        e.values?.find((item: any) => String(item.value) === String(value))?.label ?? NO_DATA_LABEL
      }`}</span>
    </div>
  );
};

const renderSelectBoxes = (e: any, data: any) => {
  const label = getLabel(e);
  const values = getValue(e.key, data);

  const selectedKeys = Object.entries(values)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ?.filter(([_, value]) => value)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ?.map(([key, _]) => key);

  const filteredValues = e.values?.filter((item: any) => selectedKeys.includes(item.value));

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span>
        {filteredValues.length === 0
          ? NO_DATA_LABEL
          : filteredValues.map((item: any) => item.label).join(', ')}
      </span>
    </div>
  );
};

const renderSignature = (e: any, data: any) => {
  const label = getLabel(e);
  const value = getValue(e.key, data);

  return (
    <div key={e.id} className='w-1/2 grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <Image src={value} alt={label} width='50' height='100' />
    </div>
  );
};

const renderUsageCountForm = (e: any, data: any) => {
  const headerTdStyles = 'px-6 py-4 text-left font-bold text-sm border-b-2 border-bcYellowWarning';
  const bodyTdStyles = 'px-6 py-4 text-left text-sm ';

  const formInfo: { key: string; label: string }[] = [];
  const usageFormData = getValue(e.key, data);

  if (!checkIfGridHasValues(usageFormData) || usageFormData === '-') return NO_DATA_LABEL;

  // create array of key and label values from the form grid
  e?.components.forEach((c: any) => {
    c.columns.forEach((ic: any) => {
      // some obj have more than 1 column of data
      // and some have just 2 columns, but 1 of the 2 is always empty
      if (ic.components.length === 0) {
        return;
      }

      const obj = ic.components[0];
      formInfo.push({ key: obj?.key, label: obj?.label });
    });
  });

  return (
    <div className='col-span-2 overflow-auto' key={e.id}>
      <table className='min-w-full border-2 border-black rounded'>
        <thead className='bg-bcGrayInput'>
          <tr>
            {formInfo &&
              formInfo.map((f: any) => (
                <th key={f.label} scope='col' className={headerTdStyles}>
                  {f.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {usageFormData &&
            usageFormData.map((ad: any, index: number) => (
              <tr
                key={formInfo[index].label + index}
                className='bg-white border-b-2 even:bg-bcGrayInput border-gray-200'
              >
                {formInfo.map((item, tdIndex) => {
                  return (
                    <td key={`td-${tdIndex}`} className={bodyTdStyles}>
                      {formatDate(ad[item.key]) || NO_DATA_LABEL}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const renderHtmlText = (html: string) => {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(html, 'text/html');
  const text = parsedHTML?.body?.firstChild?.textContent?.trim();
  return (
    <div key={text} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{text}</span>
    </div>
  );
};

const renderElementType = (e: any, formData: any, fetchData?: any) => {
  // a few labels on CHEFS are required to be shown, need to check for them before we filter their types out
  if (HTML_TO_BE_RENDERED.includes(e.html)) {
    return renderHtmlText(e.html);
  }

  if (NOT_TO_BE_RENDERED.includes(e.type) || MISC_LABELS_TO_REMOVE.includes(e.label)) return;

  switch (e.type) {
    case 'datagrid':
      return renderUsageCountForm(e, formData);

    case 'simpleselectboxesadvanced':
      return renderSelectBoxes(e, formData);

    case 'columns':
    case 'simplecols2':
      return renderColumns(e, formData, fetchData);

    case 'fieldset':
      return renderFieldSet(e, formData, fetchData);

    case 'container':
    case 'well':
      return renderChildComponents(e, formData, fetchData);

    case 'simplefile':
      return renderFile(e, formData, fetchData);

    case 'simplecheckbox':
    case 'simplecheckboxadvanced':
      return renderCheckbox(e, formData);

    case 'simpleradios':
    case 'simpleradioadvanced':
    case 'radio':
      return renderRadioValue(e, formData);

    case 'table':
      return renderCountTable(e, formData);

    case 'simplesignatureadvanced':
      return renderSignature(e, formData);

    default:
      if (SIMPLE_TYPES.includes(e.type)) {
        return renderGeneralField(e, formData);
      }
      return renderNoTypeFound(e, formData);
  }
};

export const renderElement = (e: any, formData: any, fetchData?: any) => {
  if (!e || NOT_TO_BE_RENDERED.includes(e.type)) return;

  return renderElementType(e, formData, fetchData);
};
