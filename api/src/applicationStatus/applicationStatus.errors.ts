import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const ApplicationStatusError = {
  APPLICATION_STATUS_NOT_FOUND: {
    errorType: 'APPLICATION_STATUS_NOT_FOUND',
    errorMessage: 'Cannot find application status',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
