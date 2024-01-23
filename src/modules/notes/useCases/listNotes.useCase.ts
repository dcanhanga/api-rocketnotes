import { inject, injectable } from 'tsyringe';

import { type ILinks } from '../model/links';
import { type ITags } from '../model/tags';
import { INotesRepository } from '../repositories/interfaces/INotesRepository';

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
@injectable()
class ListNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private readonly notesRepository: INotesRepository
  ) {}

  execute = async (id: string): Promise<INotesResponse> => {
    const note = await this.notesRepository.listNote(id);

    if (!note?.id) {
      throw new AppError('Nota não encontrada', 404);
    }

    const { id: noteId, title, description, created_at, updated_at } = note;
    const tags = await this.notesRepository.listTags(id);
    const links = await this.notesRepository.listLinks(id);

    return { id: noteId, title, description, created_at, updated_at, tags, links };
  };
}
export { ListNotesUseCase };
