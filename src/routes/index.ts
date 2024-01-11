import { Router } from 'express';

import { accountsRoutes } from '@/modules/accounts/http/routes';

const routes = Router();
routes.use(accountsRoutes);
routes.get('/', (res, re) => {
  re.send();
});
export { routes };
