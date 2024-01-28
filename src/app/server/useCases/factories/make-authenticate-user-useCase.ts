import { UsersRepository } from '../../repositories';
import { AuthenticateUserUseCase } from '../authenticate-users.useCase';

export const makeAuthenticateUserUseCase = (): AuthenticateUserUseCase => {
  const usersRepository = new UsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  return authenticateUserUseCase;
};
