/* eslint-disable no-console */
import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { env } from '@/config/env';
import { AppError } from '@/shared/errors/appError';

export const asyncErros = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof ZodError) {
    return response.status(400).json({ message: 'Validation error', issues: error.format() });
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return response.status(500).json({
    status: 'error',
    message: `Server Internal error ${error.message}`
  });
};
