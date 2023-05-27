export interface HandleReturn {
  statusCode: number;
  body: any;
}

export enum HandleCode {
  OK = 200,
  CREATED = 201,
}
