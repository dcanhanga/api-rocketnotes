/* eslint-disable no-console */
import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@/config/auth';
import { UsersRepository } from '@/modules/accounts/repositories/implementations/users';
import { AppError } from '@/shared/errors/appError';

export const ensureAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Authorization token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret);

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id as string);

    if (!user) {
      throw new AppError('Does not Exits.', 422);
    }

    request.user = { id: user_id as string };

    next();
  } catch (error) {
    console.error('Error decoding token:', error.message);
    throw new AppError('Invalid user ID in the token.', 401);
  }
};
