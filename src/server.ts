/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import './shared/container/tsyringe';

import { env } from './config/env';
import { waitForDatabaseConnection } from './database/knex';
import { asyncErros } from './middlewares/async-errors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(asyncErros);

const startServer = async (): Promise<void> => {
  await waitForDatabaseConnection();
  app.listen(env.PORT, () => {
    console.log(`Server is 🚀 on port  http://localhost:${env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Error starting the server:', error);
});
