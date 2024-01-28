import { NotesRepository } from '../../repositories';
import { DeleteNotesUseCase } from '../delete-notes.useCase';

export const makeDeleteNote = (): DeleteNotesUseCase => {
  const notesRepository = new NotesRepository();
  const deleteNotesUseCase = new DeleteNotesUseCase(notesRepository);
  return deleteNotesUseCase;
};
