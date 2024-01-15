import { Router } from 'express';
import multer from 'multer';

import { createUsersController } from '../controller/createUsers.controller';

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';
import { uploadImage } from '@/middlewares/uploadImage';

const usersRoutes = Router();
const upload = multer({
  storage: multer.memoryStorage()
});

usersRoutes.post(
  '/',
  upload.single('avatar'),
  uploadImage,
  createUsersController.handle
);
usersRoutes.put('/', ensureAuthenticated, (r, res) => {
  const id = r.user.id;
  res.json({ id });
});
export { usersRoutes };
