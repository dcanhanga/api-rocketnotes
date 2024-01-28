import {
  type ITagsRepository,
  type INotesRepository,
  type ILinksRepository
} from '../repositories/protocols';

import { type INotesDTO } from '@/app/dtos';
import { AppError } from '@/shared/errors/appError';

export class CreateNotesUseCase {
  constructor(
    private readonly notesRepository: INotesRepository,
    private readonly tagsRepository: ITagsRepository,
    private readonly linksRepository: ILinksRepository
  ) {}

  execute = async (data: INotesDTO): Promise<void> => {
    const { description, tags, title, links, userId } = data;
    if (!userId) {
      throw new Error();
    }

    const noteAllReadyExists = await this.notesRepository.findByTitle(title);
    if (noteAllReadyExists) {
      throw new AppError('Nota já cadastrada', 409);
    }
    const noteId = await this.notesRepository.createNote({
      description,
      title,
      userId
    });

    if (links) {
      await this.linksRepository.createLinks({ links, noteId });
    }
    await this.tagsRepository.createTags({ noteId, tags, userId });
  };
}
