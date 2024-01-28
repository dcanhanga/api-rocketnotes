import { UsersRepository } from '../../repositories';
import { UpdateUsersUseCase } from '../update-users.useCase';

export const makeUpdateUserUseCase = (): UpdateUsersUseCase => {
  const usersRepository = new UsersRepository();
  const updateUsersUseCase = new UpdateUsersUseCase(usersRepository);
  return updateUsersUseCase;
};
