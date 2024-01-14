import { Router } from 'express';

import { authenticateUserController } from './../controller/authenticateUse.controller';
const authenticateRoutes = Router();
authenticateRoutes.post('/sessions', authenticateUserController.handle);
export { authenticateRoutes };
