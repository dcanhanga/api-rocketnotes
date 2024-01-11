/* eslint-disable no-console */
import knexSetup, { type Knex } from 'knex';
import path from 'path';

import { env } from '../../utils/env';

export const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    port: env.DB_PORT,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
  },
  seeds: {
    directory: path.resolve(__dirname, './', 'seeds')
  },
  migrations: {
    directory: path.resolve(__dirname, './', 'migrations')
  }
};
const runMigrations = async (): Promise<void> => {
  try {
    console.log('Running migrations...');
    console.log(env.DB_PASSWORD);
    await knex.migrate.latest();
    console.log('Migrations executed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw new Error('Failed to run migrations. See the error above for details.');
  }
};
const knex = knexSetup(config);
export { runMigrations, knex };
