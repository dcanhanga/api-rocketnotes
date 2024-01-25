import { MissingParamsError } from '../errors/missing-param';
import { badRequest } from '../helpers/http-helper';
import { type IController } from '../protocols/controller';
import { type IHttpResponse, type IHttpRequest } from '../protocols/https';

export class SignUpController implements IController {
  handle = (httpRequest: IHttpRequest): IHttpResponse => {
    const requiredFields = ['email', 'name', 'password'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(`Missing param: ${field}`));
      }
    }
  };
}
