import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    const decodedToken = verify(token, '1c718e15389c944fa75933d293b1eb13');
    if (typeof decodedToken !== 'object' || !('sub' in decodedToken)) {
      throw new AppError('Invalid authorization token.', 401);
    }
    const { sub: user_id } = decodedToken;
    if (typeof user_id !== 'string') {
      throw new AppError('Invalid user ID in the token.', 422);
    }
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.', 422);
    }
    next();
  } catch (error) {
    throw new AppError('Invalid user ID in the token.', 401);
  }
};
