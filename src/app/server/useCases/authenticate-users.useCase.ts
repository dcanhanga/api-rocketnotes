import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { type IUsersRepository } from '../repositories/protocols/IUsersRepository';

import auth from '@/config/auth';
import { AppError } from '@/shared/errors/appError';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
    avatar_url?: string | null;
    storage_url?: string | null;
  };
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  execute = async ({ email, password }: IRequest): Promise<IResponse> => {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password Incorrect!', 401);
    }
    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new AppError('Email or password Incorrect!', 401);
    }
    const token = sign({}, auth.secret, {
      subject: user.id,
      expiresIn: auth.expire_in
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        storage_url: user.storage_url
      },
      token
    };
  };
}
