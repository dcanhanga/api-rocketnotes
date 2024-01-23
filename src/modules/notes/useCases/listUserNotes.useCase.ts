import { inject, injectable } from 'tsyringe';

import { type INotes } from '../model/notes';
import { INotesRepository } from '../repositories/interfaces/INotesRepository';

@injectable()
class ListUserNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private readonly notesRepository: INotesRepository
  ) {}

  execute = async (userId: string): Promise<INotes[]> => {
    const notes = await this.notesRepository.listUserNotes(userId);
    return notes;
  };
}
export { ListUserNotesUseCase };
