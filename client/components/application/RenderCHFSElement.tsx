import { API_ENDPOINT } from '../../constants';
import { useHttp } from '../../services/useHttp';
import { NOT_TO_BE_RENDERED, renderElement } from 'helpers';

const NESTED_COMPONENTS = ['simplecols2'];

export const RenderCHFSElement: React.FC<any> = ({ component, formData }) => {
  const { fetchData } = useHttp();

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

  return !component.hidden && !NOT_TO_BE_RENDERED.includes(component.type) ? (
    !NESTED_COMPONENTS.includes(component.type) ? (
      component?.components?.map((i: any) =>
        renderElement(i, formData, downloadFile, component.key),
      )
    ) : (
      <>
        {component.columns?.map((eachCol: any) =>
          eachCol?.components?.components?.map((e: any) =>
            renderElement(e, formData, downloadFile),
          ),
        )}
      </>
    )
  ) : (
    <></>
  );
};
