import { Router } from 'express';

import { createUsersController } from '../controller/createUsers.controller';

const usersRoutes = Router();

usersRoutes.post('/', createUsersController.handle);

export { usersRoutes };
