import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3033),
  DATABASE_URL: z
    .string()
    .default('postgresql://rocketnotes:rocketnotes@localhost:5432/rocketnotes')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  // eslint-disable-next-line no-console
  console.error('🚫 Invalid environment variable', _env.error.format());
  throw new Error('🚫 Invalid environment variable');
}
const env = _env.data;
export { env };
