import { SignUpController } from './signup.controller';
import { MissingParamsError } from '../errors/missing-param';
const makeSut = (): SignUpController => {
  return new SignUpController();
};
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Missing param: name')
    );
  });

  test('Should return 400 if no email is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Missing param: email')
    );
  });
  test('Should return 400 if no email is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        name: 'any_name'
      }
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('Missing param: password')
    );
  });
});
