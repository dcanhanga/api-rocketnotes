import express from 'express';
import 'express-async-errors';

import { asyncErros } from './http/middlewares';
import { routes } from './http/routes';

export const app = express();

app.use(express.json());
app.use(routes);
app.use(asyncErros);
