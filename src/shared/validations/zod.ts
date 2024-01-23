import { z } from 'zod';

import { isPasswordValid } from './isPasswordValid';
import {
  avatarUrlInvalidMessage,
  emailInvalidMessage,
  isPasswordValidMessage,
  storeUrlInvalidMessage
} from '../utils/message';

export const createUsersBodySchema = z.object({
  name: z.string(),
  email: z.string().email(emailInvalidMessage),
  password: z.string().refine(isPasswordValid, isPasswordValidMessage)
});

export const updateUsersBodySchema = z.object({
  name: z.string().optional().optional(),
  email: z.string().email(emailInvalidMessage).optional(),
  password: z.string().refine(isPasswordValid, isPasswordValidMessage).optional(),
  old_password: z.string().optional(),
  avatar_url: z.string().url(avatarUrlInvalidMessage).optional(),
  storage_url: z.string().url(storeUrlInvalidMessage).optional()
});
export const createNotesBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  links: z.array(z.string()).optional()
});
export const listUserNotesUseCaseQuerySchema = z.object({
  title: z.string().optional(),
  tags: z.string().optional()
});
