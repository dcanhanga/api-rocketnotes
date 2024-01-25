import { type IHttpRequest, type IHttpResponse } from './https';

export interface IController {
  handle: (httpRequest: IHttpRequest) => IHttpResponse;
}
