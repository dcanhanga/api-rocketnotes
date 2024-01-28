import { type IUsersRepository } from '../../protocols/IUsersRepository';

import { knex } from '@/app/database';
import { type IUser } from '@/app/model/users';

export class KnexUsersRepository implements IUsersRepository {
  findByEmail = async (email: string): Promise<IUser | undefined> => {
    const user = await knex.table('users').where({ email }).first();
    return user;
  };

  findById = async (id: string): Promise<IUser | undefined> => {
    const user = await knex.table('users').where({ id }).first();
    return user;
  };

  create = async (data: IUser): Promise<void> => {
    await knex.table('users').insert(data);
  };

  update = async (id: string, data: Partial<IUser>): Promise<void> => {
    await knex.table('users').where({ id }).update(data);
  };
}
