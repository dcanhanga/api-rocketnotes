import { MissingParamsError } from '../errors/missing-param';
import { badRequest } from '../helpers/http-helper';
import { type IHttpResponse, type IHttpRequest } from '../protocols/https';

export class SignUpController {
  handle = (httpRequest: IHttpRequest): IHttpResponse => {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('Missing param: name'));
    }
    return badRequest(new MissingParamsError('Missing param: email'));
  };
}
