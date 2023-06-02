export enum StatusCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export class Exception extends Error {
  constructor(public message: string, public statusCode: StatusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
