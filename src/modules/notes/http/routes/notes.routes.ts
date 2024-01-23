import { Router } from 'express';

import { createNotesController } from '../controllers/createNotes.controllers';
import { deleteNotesControllers } from '../controllers/deleteNotes.controllers';
import { getNoteDetailsController } from '../controllers/getNoteDetails.controllers';
import { listUserNotesController } from '../controllers/listUserNotes.controllers';

import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const notesRoutes = Router();

notesRoutes.get('/:id', ensureAuthenticated, getNoteDetailsController.handle);
notesRoutes.get('/', ensureAuthenticated, listUserNotesController.handle);

notesRoutes.post('/', ensureAuthenticated, createNotesController.handle);

notesRoutes.delete('/:id', ensureAuthenticated, deleteNotesControllers.handle);
export { notesRoutes as notes };
