import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const CompletionStatusError = {
  COMPLETION_STATUS_NOT_FOUND: {
    errorType: 'COMPLETION_STATUS_NOT_FOUND',
    errorMessage: 'Cannot find completion status',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
