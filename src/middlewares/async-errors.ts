import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { env } from '@/utils/env';
import { AppError } from '@/utils/errors/appError';
export const asyncErros = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ZodError) {
    return response.status(400).json({ message: 'Validation error', issues: error.format() });
  }
  if (env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return response
    .status(500)
    .json({ status: 'error', message: `Server Internal error ${error.message}` });
};
