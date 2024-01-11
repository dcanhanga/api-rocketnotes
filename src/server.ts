/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';

import { runMigrations } from './database/knex';
import { asyncErros } from './middlewares/async-errors';
import { env } from './utils/env';

const app = express();

app.use(express.json());

app.use(asyncErros);

const startServer = async (): Promise<void> => {
  await runMigrations();

  app.listen(env.PORT, () => {
    console.log(`Server is 🚀 on port  http://localhost:${env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Error starting the server:', error);
});
