import Image from 'next/image';
import { Button } from '@components';

const TYPE_AS_STRING = [
  'textfield',
  'simpletextfield',
  'simpletextfieldadvanced',
  'simpletextareaadvanced',
  'textarea',
  'simpletextarea',
  'radio',
  'simpleradios',
  'simpleradioadvanced',
  'select',
  'currency',
  'day',
  'phoneNumber',
];

export const NOT_TO_BE_RENDERED = [
  'button',
  'simplecontent',
  'htmlelement',
  'simplebuttonadvanced',
  'simplecheckboxadvanced',
];

// TODO: try removing fields from form
const MISC_LABELS_TO_REMOVE = ['primaryContactColumns', 'secondaryContactColumns', 'Text/Images'];

const renderSelectBoxes = (e: any, data: any, container: string) => (
  <div key={e.id} className='w-fit grid grid-flow-row'>
    <span className='font-bold'>{e.label}</span>
    <span>
      {' '}
      {Object.entries(data[container][e.key])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ?.filter(([_, value]) => value)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([key, _]) => key)
        .join(', ') || '-'}
    </span>
  </div>
);

const renderGeneralField = (e: any, data: any, container: string) => {
  // TODO: try removing fields from form
  if (MISC_LABELS_TO_REMOVE.includes(e.label)) {
    return;
  }
  const label = e.properties?.portalWording ?? e.label;

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>{`${data[container][e.key] || '-'}`}</span>
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
  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{e.label}</span>
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

    return (
      <>
        <div key={component.id} className='w-fit grid grid-flow-row'>
          <span className='font-bold'>{name.label}</span>
          <span>{`${data[container][name.key] || '-'}`}</span>
          <span className='font-bold'>{date.label}</span>
          <span>{`${data[container][date.key] || '-'}`}</span>
          <span className='font-bold'>{sig.label}</span>
          <Image src={data[container][sig.key]} alt={sig.label} width='50' height='100' />
        </div>
      </>
    );
  } else {
    return e.components.map((c: any) => {
      return (
        <div key={c.id} className='w-fit grid grid-flow-row'>
          <span className='font-bold'>{c.label}</span>
          <span key={c.key}>{`${data[container][c.key] || '-'}`}</span>
        </div>
      );
    });
  }
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
        return c.type !== 'columns'
          ? renderGeneralField(c, formData, componentKey)
          : c.columns?.map((eachCol: any) =>
              eachCol?.components?.map((ec: any) => renderGeneralField(ec, formData, componentKey)),
            );
      }
    });
};

const renderCheckbox = (e: any, data: any, container?: any) => {
  const value = data[container][e.key];
  if (typeof data[container][e.key] === 'boolean') {
    data[container][e.key] = value ? 'yes' : 'no';
  }

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{e.label}</span>
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
      default:
        if (TYPE_AS_STRING.includes(e.type)) {
          return renderGeneralField(e, formData, componentKey);
        }

        return (
          <>
            <h3> Not a simple component {e.type}</h3>
            <h3>{e.key}</h3>
            <h3>{JSON.stringify(formData[e.key])}</h3>
          </>
        );
    }
  }
};

export const renderElement = (e: any, formData: any, downloadFile: any, componentKey?: any) => (
  <>{renderRespectiveElement(e, formData, downloadFile, componentKey)}</>
);
