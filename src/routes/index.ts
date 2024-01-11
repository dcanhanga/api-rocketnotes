import { Router } from 'express';

import { accountsRoutes } from '@/modules/accounts/http/routes';

const routes = Router();
routes.use(accountsRoutes);

export { routes };
