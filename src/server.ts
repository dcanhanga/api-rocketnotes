/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import { waitForDatabaseConnection } from './database/knex';
import './shared/container/tsyringe';
import { asyncErros } from './middlewares/async-errors';
import { routes } from './routes';
import { env } from './shared/env';

const app = express();

app.use(express.json());
app.use(routes);
app.use(asyncErros);

const startServer = async (): Promise<void> => {
  await waitForDatabaseConnection();
  console.log('Starting the server...');
  app.listen(env.PORT, () => {
    console.log(`Server is 🚀 on port  http://localhost:${env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Error starting the server:', error);
});
