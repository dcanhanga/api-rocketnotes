import { Router } from 'express';
import multer from 'multer';

import { createUsersController } from '../controller/createUsers.controller';
import { updateUsersController } from '../controller/updateUsers.controller';

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer({
  storage: multer.memoryStorage()
});

usersRoutes.post('/', upload.single('avatar'), createUsersController.handle);
usersRoutes.put(
  '/',
  ensureAuthenticated,
  upload.single('avatar'),
  // uploadImage,
  updateUsersController.handle
);
export { usersRoutes };
