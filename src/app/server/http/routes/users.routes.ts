import { Router } from 'express';
import multer from 'multer';

import { createUsersController, updateUsersController } from '../controllers';
import { ensureAuthenticated } from '../middlewares';

const usersRoutes = Router();
const upload = multer({
  storage: multer.memoryStorage()
});

usersRoutes.post('/', upload.single('avatar'), createUsersController.handle);
usersRoutes.put('/', ensureAuthenticated, upload.single('avatar'), updateUsersController.handle);
export { usersRoutes };
