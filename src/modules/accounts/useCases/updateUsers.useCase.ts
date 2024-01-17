import { compare, hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe';

import { type IUpdateUsersDTO } from '../dtos';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';

import { AppError } from '@/shared/errors/appError';

@injectable()
class UpdateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  execute = async (data: IUpdateUsersDTO): Promise<void> => {
    const { email, name, old_password, password, avatar_url, id, storage_url } =
      data;
    if (!old_password) {
      throw new AppError(
        'Você precisa inserir a password antiga para alterar os seus dados'
      );
    }
    if (!id) {
      // eslint-disable-next-line no-console
      console.error(
        'ID not find, mistake to replace id in  ensureAuthenticated to UpdateUsersController'
      );
      throw new Error('');
    }
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const passwordMatch = await compare(old_password, user.password_hash);
    if (!passwordMatch) {
      throw new AppError('A senha antiga não confere');
    }

    if (email) {
      const userWithUpdatedEmail =
        await this.usersRepository.findByEmail(email);

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
        throw new AppError('Este email já em uso', 409);
      }
    }

    if (password && old_password) {
      user.password_hash = await hash(password, 6);
    }

    await this.usersRepository.update(id, {
      name: name ?? user.name,
      email: email ?? user.email,
      storage_url: storage_url ?? user.storage_url,
      avatar_url: avatar_url ?? user.avatar_url,
      password_hash: user.password_hash,
      updated_at: new Date()
    });
  };
}
export { UpdateUsersUseCase };
