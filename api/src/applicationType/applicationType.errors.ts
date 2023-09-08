import { HttpStatus } from '@nestjs/common';
import { GenericError } from '../common/generic-exception';

export const ApplicationTypeError = {
  APPLICATION_TYPE_NOT_FOUND: {
    errorType: 'APPLICATION_TYPE_NOT_FOUND',
    errorMessage: 'Cannot find application type',
    httpStatus: HttpStatus.NOT_FOUND,
  } as GenericError,
};
