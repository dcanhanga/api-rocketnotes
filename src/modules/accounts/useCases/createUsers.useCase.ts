import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { inject, injectable } from 'tsyringe';

import { type ICreateUsersDTO } from '../dtos';
import { type IUser } from '../model/users';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';

import { knex } from '@/database/knex';
import { AppError } from '@/shared/errors/appError';

@injectable()
class CreateUsersUseCase {
  constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) {}
  execute = async (data: ICreateUsersDTO): Promise<void> => {
    const emailAlreadyExits = await this.usersRepository.findByEmail(data.email);
    if (emailAlreadyExits) {
      throw new AppError('Esse email já está cadastrado', 409);
    }
    const password_hash = await hash(data.password, 6);
    const newUser: IUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash
    };
    await knex.table('users').insert(newUser);
  };
}

export { CreateUsersUseCase };
