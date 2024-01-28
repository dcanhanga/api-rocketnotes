/* eslint-disable no-console */
import { waitForDatabaseConnection } from './app/database/knex';
import { app } from './app/server/express-server';
import { env } from './config/env';

const startServer = async (): Promise<void> => {
  await waitForDatabaseConnection();
  app.listen(env.PORT, () => {
    console.log(`Server is 🚀 on port  http://localhost:${env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Error starting the server:', error);
});
