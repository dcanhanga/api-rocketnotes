import { z } from 'zod';

import {
  avatarUrlInvalidMessage,
  emailInvalidMessage,
  passwordInvalidMessage,
  storeUrlInvalidMessage
} from '../utils/message';
import { passwordRegex } from '../utils/passwordRegex';

export const createUsersBodySchema = z.object({
  name: z.string(),
  email: z.string().email(emailInvalidMessage),
  password: z.string().refine(passwordRegex, passwordInvalidMessage)
});

export const updateUsersBodySchema = z.object({
  name: z.string().optional().optional(),
  email: z.string().email(emailInvalidMessage).optional(),
  password: z.string().refine(passwordRegex, passwordInvalidMessage).optional(),
  old_password: z.string(),
  avatar_url: z.string().url(avatarUrlInvalidMessage).optional(),
  storage_url: z.string().url(storeUrlInvalidMessage).optional()
});
