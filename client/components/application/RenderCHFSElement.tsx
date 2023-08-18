import React from 'react';
import { useHttp } from '../../services/useHttp';
import { renderElement } from 'helpers';

export const RenderCHFSElement: React.FC<any> = ({ component, formData }) => {
  const { fetchData } = useHttp();

  return !component.hidden && renderElement(component, formData, component.key, fetchData);
};
