import React from 'react';
import Image from 'next/image';
import { Button } from '@components';
import { API_ENDPOINT } from '../constants';

const NO_DATA_LABEL = '-';

// array of simple types that can use basic renderGeneralField
const SIMPLE_TYPES = [
  'currency',
  'day',
  'phoneNumber',
  'select',
  'simplecurrencyadvanced',
  'simpledatetimeadvanced',
  'simplenumber',
  'simplenumberadvanced',
  'simpletextarea',
  'simpletextareaadvanced',
  'simpletextfield',
  'simpletextfieldadvanced',
  'textarea',
  'textfield',
];

// array of types such as banners, info, headings etc.
const NOT_TO_BE_RENDERED = ['button', 'htmlelement', 'simplebuttonadvanced', 'simplecontent'];

// some questions require wording changes on FE,
// portalWording is a custom key containing the updated wording added by us, sent from CHEFS
const getLabel = (component: any) => {
  return component.properties?.portalWording ?? component.label;
};

const MISC_LABELS_TO_REMOVE = ['primaryContactColumns', 'secondaryContactColumns', 'Text/Images'];

const renderCheckbox = (e: any, data: any, container: string) => {
  const label = getLabel(e);
  const value = data[container][e.key];
  let valueRender = 'Yes' || NO_DATA_LABEL;

  if (value === false) {
    valueRender = 'No';
  }

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${valueRender}`}</span>
    </div>
  );
};

const renderCountTable = (e: any, data: any, container: string) => {
  return e.rows?.map((r: any) => renderGeneralField(r[1].components[0], data, container));
};

const renderColumns = (e: any, data: any, container: string, fetchData?: any) => {
  return e.columns?.map((col: any) => {
    return col.components?.map((component: any) => {
      if (
        NOT_TO_BE_RENDERED.includes(component.type) ||
        MISC_LABELS_TO_REMOVE.includes(component.label)
      )
        return;
      return renderElementType(component, data, container, fetchData);
    });
  });
};

const renderFieldSet = (e: any, data: any, container: string, fetchData?: any) => {
  return (
    <React.Fragment key={e.id}>
      {e.legend && (
        <span className='col-span-2 underline text-black text-xl font-bold capitalize'>
          {e.legend}
        </span>
      )}

      {e.components?.map((c: any) => {
        if (NOT_TO_BE_RENDERED.includes(c.type) || MISC_LABELS_TO_REMOVE.includes(c.label)) return;
        return renderElementType(c, data, container, fetchData);
      })}
    </React.Fragment>
  );
};

const renderChildComponents = (e: any, data: any, container: string, fetchData?: any) => {
  return e.components?.map((c: any) => {
    if (NOT_TO_BE_RENDERED.includes(c.type) || MISC_LABELS_TO_REMOVE.includes(c.label)) return;
    return renderElementType(c, data, container, fetchData);
  });
};

const renderFile = (e: any, data: any, container: string, fetchData: any) => {
  const files = data[container][e.key];
  const label = getLabel(e);

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

  if (!files) return;

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

const renderGeneralField = (e: any, data: any, container: string) => {
  if (MISC_LABELS_TO_REMOVE.includes(e.label)) {
    return;
  }

  const value = data[container][e.key];
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>
        {(e.type === 'currency' || e.type === 'simplecurrencyadvanced') && 'CA$'}
        {`${value || NO_DATA_LABEL}`}
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

const renderRadioValue = (e: any, data: any, container: string) => {
  const label = getLabel(e);
  const value = data[container][e.key];

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${
        e.values?.find((item: any) => String(item.value) === String(value))?.label ?? NO_DATA_LABEL
      }`}</span>
    </div>
  );
};

const renderSelectBoxes = (e: any, data: any, container: string) => {
  const label = getLabel(e);
  const values = data[container][e.key];

  const selectedKeys = Object.entries(values)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ?.filter(([_, value]) => value)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([key, _]) => key);

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

const renderSignature = (e: any, data: any, container: string) => {
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-1/2 grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <Image src={data[container][e.key]} alt={e.label} width='50' height='100' />
    </div>
  );
};

const renderUsageCountForm = (e: any, data: any, container: string) => {
  const headerTdStyles = 'px-6 py-4 text-left font-bold text-sm border-b-2 border-bcYellowWarning';
  const bodyTdStyles = 'px-6 py-4 text-left text-sm ';

  const formInfo: { key: string; label: string }[] = [];
  const usageFormData = data[container][e.key];

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
    <div className='col-span-2' key={e.id}>
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
                <td className={bodyTdStyles}>{ad[formInfo[0].key] || NO_DATA_LABEL}</td>
                <td className={bodyTdStyles}>{ad[formInfo[1].key] || NO_DATA_LABEL}</td>
                <td className={bodyTdStyles}>{ad[formInfo[2].key] || NO_DATA_LABEL}</td>
                <td className={bodyTdStyles}>{ad[formInfo[3].key] || NO_DATA_LABEL}</td>
                <td className={bodyTdStyles}>{ad[formInfo[4].key] || NO_DATA_LABEL}</td>
                <td className={bodyTdStyles}>{ad[formInfo[5].key] || NO_DATA_LABEL}</td>
              </tr>
            ))}
          <tr className='bg-white border-b-2 even:bg-bcGrayInput border-gray-200'>
            <td colSpan={2}></td>
            <td className={`${bodyTdStyles} font-bold`}>Totals</td>
            <td className={bodyTdStyles}>{data[container]['bicycleCount']}</td>
            <td className={bodyTdStyles}>{data[container]['pedestrianCount']}</td>
            <td className={bodyTdStyles}>{data[container]['otherCount']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const renderElementType = (e: any, formData: any, componentKey: string, fetchData?: any) => {
  switch (e.type) {
    case 'datagrid':
      return renderUsageCountForm(e, formData, componentKey);

    case 'simpleselectboxesadvanced':
      return renderSelectBoxes(e, formData, componentKey);

    case 'columns':
    case 'simplecols2':
      return renderColumns(e, formData, componentKey, fetchData);

    case 'fieldset':
      return renderFieldSet(e, formData, componentKey, fetchData);

    case 'container':
    case 'well':
      return renderChildComponents(e, formData, componentKey, fetchData);

    case 'simplefile':
      return renderFile(e, formData, componentKey, fetchData);

    case 'simplecheckbox':
    case 'simplecheckboxadvanced':
      return renderCheckbox(e, formData, componentKey);

    case 'simpleradios':
    case 'simpleradioadvanced':
    case 'radio':
      return renderRadioValue(e, formData, componentKey);

    case 'table':
      return renderCountTable(e, formData, componentKey);

    case 'simplesignatureadvanced':
      return renderSignature(e, formData, componentKey);

    default:
      if (SIMPLE_TYPES.includes(e.type)) {
        return renderGeneralField(e, formData, componentKey);
      }
      return renderNoTypeFound(e, formData);
  }
};

export const renderElement = (e: any, formData: any, componentKey: string, fetchData?: any) => {
  if (!e || NOT_TO_BE_RENDERED.includes(e.type)) return;

  return renderElementType(e, formData, componentKey, fetchData);
};
