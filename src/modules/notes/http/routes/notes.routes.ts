import { Router } from 'express';

import { createNotesController } from '../controllers/createNotes.controllers';
import { deleteNotesControllers } from '../controllers/deleteNotes.controllers';
import { listNotesController } from '../controllers/listNotes.controllers';

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const notesRoutes = Router();
notesRoutes.post('/', ensureAuthenticated, createNotesController.handle);
notesRoutes.get('/:id', ensureAuthenticated, listNotesController.handle);
notesRoutes.delete('/:id', ensureAuthenticated, deleteNotesControllers.handle);
export { notesRoutes as notes };
