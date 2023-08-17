import Image from 'next/image';
import { Button } from '@components';

// grid key for the usage count form
const GRID_KEY = 's5UsageCountFormGrid';

//styles for usage form grid
const headerTdStyles = 'px-6 py-4 text-left font-bold text-sm border-b-2 border-bcYellowWarning';
const bodyTdStyles = 'px-6 py-4 text-left text-sm ';

// array of simple types that can use basic renderGeneralField
const SIMPLE_TYPES = [
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
  'simplenumberadvanced',
  'simplenumber',
  'simplecheckbox',
];

// array of types such as banners, info, headings etc.
export const NOT_TO_BE_RENDERED = [
  'button',
  'htmlelement',
  'simplebuttonadvanced',
  'simplecheckboxadvanced',
  'simplecontent',
];

// some questions require wording changes on FE,
// portalWording is a custom key containing the updated wording added by us, sent from CHEFS
const getLabel = (component: any) => {
  return component.properties?.portalWording ?? component.label;
};

// TODO: try removing fields from form
const MISC_LABELS_TO_REMOVE = ['primaryContactColumns', 'secondaryContactColumns', 'Text/Images'];

const renderSelectBoxes = (e: any, data: any, container: string) => {
  const label = getLabel(e);
  // TODO: try removing Infrastructure Type container in Section 4
  const values = container === 's4Container' ? data?.[e.key] : data?.[container]?.[e.key];

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

  let value = '';
  const label = getLabel(e);

  // TODO: try removing Infrastructure Type container in Section 4
  if (container === 's4Container' && data?.[e.key]) {
    value = data?.[e.key];
  } else {
    value = data?.[container]?.[e.key];
  }

  return (
    <div key={e.id} className='w-fit grid grid-flow-row'>
      <span className='font-bold'>{label}</span>
      <span key={e.key}>
        {(e.type === 'currency' || e.type === 'simplecurrencyadvanced') && 'CA$'}
        {`${value || '-'}`}
      </span>
    </div>
  );
};

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
    const dateLabel = getLabel(date);
    const sigLabel = getLabel(sig);

    return (
      <div key={component.id} className='w-1/2 grid grid-flow-row'>
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
      // type object means nested item is a select box
      if (typeof data[container][c.key] === 'object') {
        return renderSelectBoxes(c, data, container);
      } else {
        return (
          <div key={c.id} className='w-fit grid grid-flow-row'>
            <span className='font-bold'>{label}</span>
            <span key={c.key}>{`${data[container][c.key] || '-'}`}</span>
          </div>
        );
      }
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

// TODO: can remove this if we can get rid of S4 nested container
const renderContainer = (e: any, formData: any, container: string) => {
  return e?.components
    .filter((i: any) => !NOT_TO_BE_RENDERED.includes(i.type))
    .map((c: any) =>
      c.components
        .filter((o: any) => !MISC_LABELS_TO_REMOVE.includes(o.label))
        .map((u: any) =>
          renderRespectiveElement(u, formData[container]['s4InfrastructureType'], null, container),
        ),
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
          case 'well':
            return renderWell(c, formData, componentKey);
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

// TODO: cleanup, remove hardcoded values, testing purposes
const renderUsageCountForm = (e: any, data: any, container: any) => {
  const formData = data[container];

  if (formData['s5UsageCountFormInNotApplicableForSelectedTypesOfAtInfrastructure']) {
    return (
      <div key={'s5UsageCountFormInNotApplicable'} className='col-span-2 w-fit grid grid-flow-row'>
        <span className='font-bold'>
          Usage Count Form is not applicable for selected type(s) infrastructures
        </span>
        <span
          key={e.key}
        >{`${data[container]['s5UsageCountFormInNotApplicableForSelectedTypesOfAtInfrastructure']}`}</span>
      </div>
    );
  } else {
    const formInfo: { key: string; label: string }[] = [];
    const usageCountGrid = e.find((ug: any) => ug.key === GRID_KEY);
    const usageFormData = data[container][GRID_KEY];

    // create array of key and label values from the form grid
    usageCountGrid?.components.forEach((c: any) => {
      c.columns.forEach((ic: any) => {
        // some obj have more than 1 column of data and some have just 2 columns, but 1 is always empty
        if (ic.components.length === 0) {
          return;
        } else {
          const obj = ic.components[0];
          formInfo.push({ key: obj?.key, label: obj?.label });
        }
      });
    });

    return (
      <div className='col-span-2'>
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
          {usageFormData &&
            usageFormData.map((ad: any, index: number) => (
              <tr
                key={formInfo[index].label + index}
                className='bg-white border-b-2 even:bg-bcGrayInput border-gray-200'
              >
                <td className={bodyTdStyles}>{ad[formInfo[0].key] || '-'}</td>
                <td className={bodyTdStyles}>{ad[formInfo[1].key] || '-'}</td>
                <td className={bodyTdStyles}>{ad[formInfo[2].key] || '-'}</td>
                <td className={bodyTdStyles}>{ad[formInfo[3].key] || '-'}</td>
                <td className={bodyTdStyles}>{ad[formInfo[4].key] || '-'}</td>
                <td className={bodyTdStyles}>{ad[formInfo[5].key] || '-'}</td>
              </tr>
            ))}
          <tr className='bg-white border-b-2 even:bg-bcGrayInput border-gray-200'>
            <td colSpan={2}></td>
            <td className={`${bodyTdStyles} font-bold`}>Totals</td>
            <td className={bodyTdStyles}>{data[container]['bicycleCount']}</td>
            <td className={bodyTdStyles}>{data[container]['pedestrianCount']}</td>
            <td className={bodyTdStyles}>{data[container]['otherCount']}</td>
          </tr>
        </table>
      </div>
    );
  }
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

const renderRespectiveElement = (e: any, formData: any, downloadFile: any, componentKey?: any) => {
  if (!NOT_TO_BE_RENDERED.includes(e.type)) {
    if (e?.key === 'usageCountFormSet') {
      return renderUsageCountForm(e?.components, formData, componentKey);
    } else if (e?.key === 's5UsageCountFormInNotApplicableForSelectedTypesOfAtInfrastructure') {
      return;
    } else {
      switch (e.type) {
        case 'simpleselectboxesadvanced':
          return renderSelectBoxes(e, formData, componentKey);
        case 'fieldset':
          return organizeFieldsetData(e, formData, componentKey);
        case 'simplefile':
          return renderFile(e, formData, downloadFile, componentKey);
        case 'well':
          return renderWell(e.components[0], formData, componentKey);
        case 'simpleradios':
        case 'simpleradioadvanced':
        case 'radio':
          return renderRadioValue(e, formData, componentKey);
        // TODO: can remove this if we can get rid of S4 nested container
        case 'container':
          return renderContainer(e, formData, componentKey);
        default:
          if (SIMPLE_TYPES.includes(e.type)) {
            return renderGeneralField(e, formData, componentKey);
          }
          return renderNoTypeFound(e, formData);
      }
    }
  }
};

export const renderElement = (e: any, formData: any, downloadFile: any, componentKey?: any) => (
  <>{renderRespectiveElement(e, formData, downloadFile, componentKey)}</>
);
