import Image from 'next/image';
import { Button } from '@components';

const TYPE_AS_STRING = [
  'currency',
  'day',
  'phoneNumber',
  'select',
  'simplecurrencyadvanced',
  'simpletextarea',
  'simpletextareaadvanced',
  'simpletextfield',
  'simpletextfieldadvanced',
  'textarea',
  'textfield',
];

export const NOT_TO_BE_RENDERED = [
  'button',
  'htmlelement',
  'simplebuttonadvanced',
  'simplecheckboxadvanced',
  'simplecontent',
];

const getLabel = (component: any) => {
  return component.properties?.portalWording ?? component.label;
};

// TODO: try removing fields from form
const MISC_LABELS_TO_REMOVE = ['primaryContactColumns', 'secondaryContactColumns', 'Text/Images'];

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
          ? '-'
          : filteredValues.map((item: any) => item.label).join(', ')}
      </span>
    </div>
  );
};

const renderGeneralField = (e: any, data: any, container: string) => {
  // TODO: try removing fields from form
  if (MISC_LABELS_TO_REMOVE.includes(e.label)) {
    return;
  }
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>
        {(e.type === 'currency' || e.type === 'simplecurrencyadvanced') && 'CA$'}
        {`${data[container][e.key] || '-'}`}
      </span>
    </div>
  );
};

// const renderDataMap = (e: any, data: any) => (
//   <>
//     <span className='font-bold'>{e.label}</span>
//     {Object.entries(data[e.key]).map(([key, value]) => (
//       <span key={key}>{`${key}: ${value ?? '-'}`}</span>
//     ))}
//   </>
// );

// const renderDataGrid = (e: any, data: any, downloadFile: any) => (
//   <>
//     <span className='font-bold'>{e.label}</span>
//     {data[e.key]?.map((eachFormData: any) =>
//       e?.components?.map((e: any) => renderElement(e, eachFormData, downloadFile)),
//     )}
//   </>
// );

const renderFile = (e: any, data: any, downloadFile: any, container: string) => {
  const file = data[container][e.key];
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      {file?.length == 1 ? (
        <Button variant='link' onClick={() => downloadFile(file[0])}>
          {file[0]['originalName']}
        </Button>
      ) : (
        '-'
      )}
    </div>
  );
};

const renderWell = (e: any, data: any, container: string) => {
  // signature element
  if (e.components[0].columns) {
    const component = e.components[0].columns;
    const sig = component[0].components[0];
    const name = component[1].components[0];
    const date = component[1].components[1];
    const nameLabel = getLabel(name);
    const dateLabel = getLabel(name);
    const sigLabel = getLabel(name);

    return (
      <div key={component.id} className='w-fit grid grid-flow-row'>
        <span className='font-bold'>{nameLabel}</span>
        <span>{`${data[container][name.key] || '-'}`}</span>
        <span className='font-bold'>{dateLabel}</span>
        <span>{`${data[container][date.key] || '-'}`}</span>
        <span className='font-bold'>{sigLabel}</span>
        <Image src={data[container][sig.key]} alt={sig.label} width='50' height='100' />
      </div>
    );
  } else {
    return e.components.map((c: any) => {
      const label = getLabel(c);

      return (
        <div key={c.id} className='w-fit grid grid-flow-row'>
          <span className='font-bold'>{label}</span>
          <span key={c.key}>{`${data[container][c.key] || '-'}`}</span>
        </div>
      );
    });
  }
};

const renderNoTypeFound = (e: any, formData: any) => {
  return (
    <>
      <h3> Not a simple component {e.type}</h3>
      <h3>{e.key}</h3>
      <h3>{JSON.stringify(formData[e.key])}</h3>
    </>
  );
};

const organizeFieldsetData = (e: any, formData: any, componentKey?: any) => {
  return e?.components
    ?.filter((i: any) => !NOT_TO_BE_RENDERED.includes(i.type))
    .map((c: any) => {
      if (Array.isArray(c.rows) && c.rows.length > 0) {
        return c.rows?.map((r: any) =>
          renderGeneralField(r[1].components[0], formData, componentKey),
        );
      } else {
        switch (c.type) {
          case 'columns':
          case 'simplecols2':
            return c.columns?.map((eachCol: any) =>
              eachCol?.components?.map((ec: any) => renderGeneralField(ec, formData, componentKey)),
            );

          case 'simpleradios':
          case 'simpleradioadvanced':
          case 'radio':
            return renderRadioValue(c, formData, componentKey);

          default:
            return renderGeneralField(c, formData, componentKey);
        }
      }
    });
};

const renderRadioValue = (e: any, data: any, container?: any) => {
  const label = getLabel(e);
  const value = data[container][e.key];

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${
        e.values?.find((item: any) => String(item.value) === String(value))?.label ?? '-'
      }`}</span>
    </div>
  );
};

const renderCheckbox = (e: any, data: any, container?: any) => {
  const label = getLabel(e);

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${data[container][e.key] ?? '-'}`}</span>
    </div>
  );
};

const renderRespectiveElement = (e: any, formData: any, downloadFile: any, componentKey?: any) => {
  if (!NOT_TO_BE_RENDERED.includes(e.type)) {
    switch (e.type) {
      case 'simpleselectboxesadvanced':
        return renderSelectBoxes(e, formData, componentKey);
      case 'fieldset':
        return organizeFieldsetData(e, formData, componentKey);
      case 'simplefile':
        return renderFile(e, formData, downloadFile, componentKey);
      case 'well':
        return renderWell(e.components[0], formData, componentKey);
      case 'simplecheckbox':
        return renderCheckbox(e, formData, componentKey);
      case 'simpleradios':
      case 'simpleradioadvanced':
      case 'radio':
        return renderRadioValue(e, formData, componentKey);
      default:
        if (TYPE_AS_STRING.includes(e.type)) {
          return renderGeneralField(e, formData, componentKey);
        }
        return renderNoTypeFound(e, formData);
    }
  }
};

export const renderElement = (e: any, formData: any, downloadFile: any, componentKey?: any) => (
  <>{renderRespectiveElement(e, formData, downloadFile, componentKey)}</>
);
