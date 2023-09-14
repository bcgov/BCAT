export const SetQueryParams = async (push: any, query: any, params: any): Promise<any> => {
  try {
    return await push({ query: params }, undefined, { shallow: true });
  } catch {
    return;
  }
};
