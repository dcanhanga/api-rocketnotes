import { type IHttpResponse, type IHttpRequest } from '../protocols/https';

export class SignUpController {
  handle = (httpRequest: IHttpRequest): IHttpResponse => {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      };
    }
    return {
      statusCode: 400,
      body: new Error('Missing param: email')
    };
  };
}