import { Router } from 'express';

import { usersRoutes } from './users.routes';

const accountsRoutes = Router();
accountsRoutes.use('/users', usersRoutes);

export { accountsRoutes };
