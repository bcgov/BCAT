export enum REQUEST_METHOD {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export const API_ENDPOINT = {
  VALIDATE_USER: '/validate',
  FETCH_USERS: '/users',
  updateUserAccess: (id: number) => `/users/${id}/access`,
  getApplicationComments: (applicationId: number) => `/applications/${applicationId}/comments`,
  APPLICATIONS: '/applications',
  getApplicationDetails: (applicationId: number) => `/applications/${applicationId}`,
  getApplicationStatus: (applicationId: number) => `/applications/${applicationId}/status`,
  getApplicationEvaluator: (applicationId: number) => `/applications/${applicationId}/assign`,
  getApplicationAttachments: (id: number) => `attachments/${id}`,
  getBroaderScores: (applicationId: number) => `/applications/${applicationId}/broader`,
  updateBroaderScores: (applicationId: number, scoreId: number) =>
    `/applications/${applicationId}/broader/${scoreId}`,
  getWorkshopScores: (applicationId: number) => `/applications/${applicationId}/workshop`,
  updateWorksopScores: (applicationId: number, scoreId: number) =>
    `/applications/${applicationId}/workshop/${scoreId}`,
  downloadApplicationScore: (applicationId: number) => `/applications/${applicationId}/download`,
  APPLICATIONS_RAW_DATA: '/applications/raw-data',
};
