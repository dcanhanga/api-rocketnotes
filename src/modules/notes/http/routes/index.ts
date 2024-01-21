import { Router } from 'express';

import { notes } from './notes.routes';

const notesRoutes = Router();
notesRoutes.use('/notes', notes);
export { notesRoutes };
