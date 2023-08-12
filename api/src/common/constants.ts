export enum RESPONSE_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const SUCCESS_RESPONSE = {
  status: RESPONSE_STATUS.SUCCESS,
};

export enum REQUEST_METHODS {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
}

export enum ApplicationType {
  INFRASTRUCTURE_FORM = 'INFRASTRUCTURE',
  NETWORK_FORM = 'NETWORK',
}
