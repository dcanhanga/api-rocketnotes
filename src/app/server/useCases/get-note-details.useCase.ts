import {
  type ILinksRepository,
  type ITagsRepository,
  type INotesRepository
} from '../repositories/protocols';

import { type ILinks, type ITags } from '@/app/model';
import { AppError } from '@/shared/errors/appError';

interface INotesResponse {
  id: string;
  title: string;
  description: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  tags: ITags[];
  links: ILinks[];
}

class GetNoteDetailsUseCase {
  constructor(
    private readonly notesRepository: INotesRepository,
    private readonly tagsRepository: ITagsRepository,
    private readonly linksRepository: ILinksRepository
  ) {}

  execute = async (id: string): Promise<INotesResponse> => {
    const note = await this.notesRepository.getNoteDetails(id);

    if (!note?.id) {
      throw new AppError('Nota não encontrada', 404);
    }

    const { id: noteId, title, description, created_at, updated_at } = note;
    const tags = await this.tagsRepository.listTags(id);
    const links = await this.linksRepository.listLinks(id);

    return { id: noteId, title, description, created_at, updated_at, tags, links };
  };
}
export { GetNoteDetailsUseCase };
