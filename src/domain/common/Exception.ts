import { StatusCode } from "./status-code";

export class Exception extends Error {
  constructor(public message: string, public statusCode: StatusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
