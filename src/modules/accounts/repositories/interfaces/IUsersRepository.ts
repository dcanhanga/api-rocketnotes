import { type IUser } from '../../model/users';

interface IUsersRepository {
  findByEmail: (email: string) => Promise<IUser | undefined>;
  findById: (id: string) => Promise<IUser | undefined>;
  create: (data: IUser) => Promise<void>;
  update: (id: string, data: Partial<IUser>) => Promise<void>;
}
export type { IUsersRepository };
