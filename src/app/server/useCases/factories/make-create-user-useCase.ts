import { UsersRepository } from '../../repositories';
import { CreateUsersUseCase } from '../create-users.useCase';

export const makeCreateUserUseCase = (): CreateUsersUseCase => {
  const usersRepository = new UsersRepository();
  const createUsersUseCase = new CreateUsersUseCase(usersRepository);
  return createUsersUseCase;
};
