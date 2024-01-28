import { Router } from 'express';

import {
  createNotesController,
  deleteNotesController,
  getNoteDetailsController,
  listUserNotesController
} from '../controllers';

export const notesRoutes = Router();
notesRoutes.post('/', createNotesController.handle);
notesRoutes.get('/:id', getNoteDetailsController.handle);
notesRoutes.get('/', listUserNotesController.handle);
notesRoutes.delete('/:id', deleteNotesController.handle);
