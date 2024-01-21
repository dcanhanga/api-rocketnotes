import { inject, injectable } from 'tsyringe';

import { type INotesDTO } from '../dtos';
import { INotesRepository } from '../repositories/interfaces/INotesRepository';

import { AppError } from '@/shared/errors/appError';

@injectable()
class CreateNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private readonly notesRepository: INotesRepository
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
      await this.notesRepository.createLinks({ links, noteId });
    }
    await this.notesRepository.createTags({ noteId, tags, userId });
  };
}
export { CreateNotesUseCase };
