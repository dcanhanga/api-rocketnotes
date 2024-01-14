import { type Response, type Request } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '../../useCases/authenticateUser.useCase';

class AuthenticateUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { password, email } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const authenticateInfo = await authenticateUserUseCase.execute({
      email,
      password
    });
    return response.status(200).json(authenticateInfo);
  };
}
export const authenticateUserController = new AuthenticateUserController();
