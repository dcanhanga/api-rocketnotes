import { inject, injectable } from 'tsyringe';

import { type IGetNoteDetails } from '../dtos';
import { type INotes } from '../model/notes';
import { INotesRepository } from '../repositories/interfaces/INotesRepository';

@injectable()
class ListUserNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private readonly notesRepository: INotesRepository
  ) {}

  execute = async ({ userId, title, tags }: IGetNoteDetails): Promise<INotes[]> => {
    const notes = await this.notesRepository.listUserNotes({ userId, title, tags });
    return notes;
  };
}
export { ListUserNotesUseCase };
