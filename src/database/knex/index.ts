/* eslint-disable no-console */
import knexSetup, { type Knex } from 'knex';
import path from 'path';

import { env } from '../../shared/env';
const MAX_CONNECTION_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = 2000; // 2 segundos

const config: Knex.Config = {
  client: 'pg',
  connection: env.DATABASE_URL,
  seeds: {
    directory: path.resolve(__dirname, './', 'seeds')
  },
  migrations: {
    directory: path.resolve(__dirname, './', 'migrations')
  }
};
const waitForDatabaseConnection = async (): Promise<void> => {
  console.log('Connecting to the database...');
  let attempts = 0;
  while (attempts < MAX_CONNECTION_ATTEMPTS) {
    try {
      await knex.raw('SELECT 1'); // Tentar uma consulta simples
      console.log('Connected to the database!');
      return;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Error connecting to the database: ${error}`);
      attempts++;
      console.log(`Retrying in ${RETRY_INTERVAL_MS} milliseconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL_MS));
    }
  }
  throw new Error('Failed to connect to the database after multiple attempts.');
};
const knex = knexSetup(config);

export { waitForDatabaseConnection, knex, config };
