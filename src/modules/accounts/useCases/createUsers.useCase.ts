import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { type ICreateUsersDTO } from '../dtos';
import { type IUser } from '../model/users';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';

import { knex } from '@/database/knex';
import { AppError } from '@/shared/errors/appError';

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  execute = async (data: ICreateUsersDTO): Promise<void> => {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      throw new AppError('Este e-mail já está cadastrado', 409);
    }

    const passwordHash = await hash(data.password, 6);

    const newUser: IUser = {
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url,
      storage_url: data.storage_url,
      password_hash: passwordHash
    };
    await knex.table('users').insert(newUser);
  };
}

export { CreateUsersUseCase };
