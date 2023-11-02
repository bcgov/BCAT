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
  getApplicationAttachments: (attachmentChefsId: string) => `attachments/${attachmentChefsId}`,
  getBroaderScores: (applicationId: number) => `/applications/${applicationId}/broader`,
  updateBroaderScores: (applicationId: number, scoreId: number) =>
    `/applications/${applicationId}/broader/${scoreId}`,
  getWorkshopScores: (applicationId: number) => `/applications/${applicationId}/workshop`,
  updateWorkshopScores: (applicationId: number, scoreId: number) =>
    `/applications/${applicationId}/workshop/${scoreId}`,
  downloadApplicationScore: (applicationId: number) => `/applications/${applicationId}/download`,
  APPLICATIONS_RAW_DATA: '/applications/raw-data',
  APPLICATIONS_COUNT_DATA: '/applications/raw-count',
  syncChefsData: '/sync-data',
  syncChefsAttachments: '/sync-data/attachments',
};
