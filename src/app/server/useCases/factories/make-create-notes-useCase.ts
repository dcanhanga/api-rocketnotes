import { LinksRepository, NotesRepository, TagsRepository } from '../../repositories';
import { CreateNotesUseCase } from '../create-notes.useCase';

export const makeCreateNotes = (): CreateNotesUseCase => {
  const notesRepository = new NotesRepository();
  const tagsRepository = new TagsRepository();
  const linksRepository = new LinksRepository();
  const createNotesUseCase = new CreateNotesUseCase(
    notesRepository,
    tagsRepository,
    linksRepository
  );
  return createNotesUseCase;
};
