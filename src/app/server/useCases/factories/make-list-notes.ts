import { NotesRepository } from '../../repositories';
import { ListNotesUseCase } from '../list-notes.useCase';

export const makeListNote = (): ListNotesUseCase => {
  const notesRepository = new NotesRepository();
  const listNotesUseCase = new ListNotesUseCase(notesRepository);
  return listNotesUseCase;
};
