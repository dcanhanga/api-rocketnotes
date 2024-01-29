import { Router } from 'express';

import { authenticateRoutes, notesRoutes, tagsRoutes, usersRoutes } from './routes';
import { ensureAuthenticated } from '../middlewares';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/notes', ensureAuthenticated, notesRoutes);
routes.use('/tags', ensureAuthenticated, tagsRoutes);
export { routes };
