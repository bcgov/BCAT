export enum OrderByOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ApplicationSortOptions {
  CONFIRMATION_ID = 'confirmationId',
  ASSIGNED_TO = 'assignedTo',
  STATUS = 'status',
  SUBMISSION_ID = 'submissionId',
  UPDATED_AT = 'updatedAt',
  FUNDING_YEAR = 'fundingYear',
  APPLICANT_NAME = 'applicantName',
  APPLICATION_TYPE_NAME = 'applicationType.name',
  TOTAL_ESTIMATED_COST = 'totalEstimatedCost',
  ASKS = 'asks',
  ASSIGNED_TO_DISPLAYNAME = 'assignedTo.displayName',
  STATUS_NAME = 'status.name',
  PROJECT_TITLE = 'projectTitle'
}

export enum AxiosResponseTypes {
  BLOB = 'blob',
  ARRAY_BUFFER = 'arraybuffer',
  STREAM = 'stream',
}

export enum CompletionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

export enum SyncTypes {
  ALL = 'ALL',
  SUBMISSIONS = 'SUBMISSIONS',
  ATTACHMENTS = 'ATTACHMENTS',
  SOFT_DELETE = 'SOFT_DELETE',
}
