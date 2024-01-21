import { Router } from 'express';

import { createNotesController } from '../controllers/createNotes.controllers';

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const notesRoutes = Router();
notesRoutes.post('/', ensureAuthenticated, createNotesController.handle);
export { notesRoutes as notes };
