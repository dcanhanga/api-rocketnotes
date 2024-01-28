import { Router } from 'express';

import { createLinksController } from '../controllers';

export const linksRoutes = Router();
linksRoutes.post('/links', createLinksController.handle);
