import { type INotesRepository } from '../repositories/protocols';

import { type IGetNoteDetails } from '@/app/dtos';
import { type INotes } from '@/app/model';

class ListUserNotesUseCase {
  constructor(private readonly notesRepository: INotesRepository) {}

  execute = async ({ userId, title, tags }: IGetNoteDetails): Promise<INotes[]> => {
    const notes = await this.notesRepository.listUserNotes({ userId, title, tags });
    return notes;
  };
}
export { ListUserNotesUseCase };
