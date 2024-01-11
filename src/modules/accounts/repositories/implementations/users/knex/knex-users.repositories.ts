import { type IUsersRepository } from '../../../interfaces/IUsersRepository';

import { knex } from '@/database/knex';
import { type IUser } from '@/modules/accounts/model/users';

class KnexUsersRepository implements IUsersRepository {
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
}

export { KnexUsersRepository };
