import { type Response, type Request } from 'express';

import { type IController } from '../../../protocols';

import { makeAuthenticateUserUseCase } from '@/app/server/useCases/factories';

export class ExpressAuthenticateUserController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { password, email } = request.body;
    const authenticateUserUseCase = makeAuthenticateUserUseCase();
    const authenticateInfo = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.status(200).json(authenticateInfo);
  };
}
