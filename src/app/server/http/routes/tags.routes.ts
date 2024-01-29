import { Router } from 'express';

import { listTagsController } from '../controllers';

export const tagsRoutes = Router();
tagsRoutes.use('/', listTagsController.handle);
