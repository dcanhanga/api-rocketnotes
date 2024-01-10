/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';

import { env } from './utils/env';

const app = express();

app.use(express.json());

app.listen(env.PORT, () => {
  console.log(`Server is 🚀 on port  http://localhost:${env.PORT}`);
});
