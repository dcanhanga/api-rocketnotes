import { LinksRepository, NotesRepository, TagsRepository } from '../../repositories';
import { GetNoteDetailsUseCase } from '../get-note-details.useCase';

export const makeGateNoteDetails = (): GetNoteDetailsUseCase => {
  const notesRepository = new NotesRepository();
  const tagsRepository = new TagsRepository();
  const linksRepository = new LinksRepository();
  const getNoteDetailsUseCase = new GetNoteDetailsUseCase(
    notesRepository,
    tagsRepository,
    linksRepository
  );
  return getNoteDetailsUseCase;
};
