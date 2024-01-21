import { Router } from 'express';

import { accountsRoutes } from '@/modules/accounts/http/routes';
import { notesRoutes } from '@/modules/notes/http/routes';

const routes = Router();
routes.use(accountsRoutes);
routes.use(notesRoutes);
export { routes };
