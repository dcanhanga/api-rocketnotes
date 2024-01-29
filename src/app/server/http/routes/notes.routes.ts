import { Router } from 'express';

import {
  createNotesController,
  deleteNotesController,
  getNoteDetailsController,
  listNotesController
} from '../controllers';

export const notesRoutes = Router();
notesRoutes.post('/', createNotesController.handle);
notesRoutes.get('/:id', getNoteDetailsController.handle);
notesRoutes.get('/', listNotesController.handle);
notesRoutes.delete('/:id', deleteNotesController.handle);
