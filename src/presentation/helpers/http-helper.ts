import { type IHttpResponse } from '../protocols/https';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
});
