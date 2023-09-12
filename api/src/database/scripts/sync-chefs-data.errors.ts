import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../../common/generic-exception';

export const SyncDataError = {
  SUBMISSION_NOT_FOUND: {
    errorType: 'SUBMISSION_NOT_FOUND',
    errorMessage: 'No submissions found in the form',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,

  SYNC_DATA_ERROR: {
    errorType: 'SYNC_DATA_ERROR',
    errorMessage: 'Error occurred fetching form',
    httpStatus: HttpStatus.BAD_REQUEST,
  } as GenericError,

  SYNC_ATTACHMENT_ERROR: {
    errorType: 'SYNC_ATTACHMENT_ERROR',
    errorMessage: 'Error occurred while fetching attachment',
    httpStatus: HttpStatus.BAD_REQUEST,
  } as GenericError,
};
