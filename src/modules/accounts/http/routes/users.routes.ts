import { Router } from 'express';
import multer from 'multer';

import { createUsersController } from '../controller/createUsers.controller';

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

export { usersRoutes };
