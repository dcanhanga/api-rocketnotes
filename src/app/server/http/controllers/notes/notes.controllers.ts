import { ExpressCreateNotesController } from './express/express-create-notes.controllers';
import { ExpressDeleteNoteController } from './express/express-dele-notes.controllers';
import { ExpressGetNoteDetailsController } from './express/express-get-note-details.controllers';
import { ExpressListNotesController } from './express/express-list-notes.controllers';

export const createNotesController = new ExpressCreateNotesController();
export const getNoteDetailsController = new ExpressGetNoteDetailsController();
export const deleteNotesController = new ExpressDeleteNoteController();
export const listNotesController = new ExpressListNotesController();
