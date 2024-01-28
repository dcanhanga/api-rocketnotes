import { Router } from 'express';

import { authenticateUserController } from '../controllers';

const authenticateRoutes = Router();
authenticateRoutes.post('/', authenticateUserController.handle);
export { authenticateRoutes };
