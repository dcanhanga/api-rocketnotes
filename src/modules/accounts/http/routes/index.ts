import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './users.routes';

const accountsRoutes = Router();
accountsRoutes.use('/users', usersRoutes);
accountsRoutes.use(authenticateRoutes);

export { accountsRoutes };
