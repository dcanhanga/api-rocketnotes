import { z } from 'zod';

export const usersBodySchema = z.object({
  name: z.string(),
  email: z.string().email({
    message: 'Invalid email address. Please enter a valid email.'
  }),
  password: z.string().refine(
    value => {
      const uppercaseRegex = /[A-Z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      return value.length >= 8 && uppercaseRegex.test(value) && specialCharRegex.test(value);
    },
    {
      message:
        'Password must have at least 8 characters, one uppercase letter, and one special character (!@#$%^&*(),.?":{}|<>).'
    }
  )
});
