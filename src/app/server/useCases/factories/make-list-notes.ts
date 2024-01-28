import { NotesRepository } from '../../repositories';
import { ListUserNotesUseCase } from '../list-user-notes.useCase';

export const makeListNote = (): ListUserNotesUseCase => {
  const notesRepository = new NotesRepository();
  const listUserNotesUseCase = new ListUserNotesUseCase(notesRepository);
  return listUserNotesUseCase;
};
