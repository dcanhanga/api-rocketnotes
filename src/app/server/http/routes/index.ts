import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { notesRoutes } from './notes.routes';
import { usersRoutes } from './users.routes';
import { ensureAuthenticated } from '../middlewares';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/notes', ensureAuthenticated, notesRoutes);
export { routes };
