import { type INotesRepository } from '../repositories/protocols';

import { type IGetNoteDetails } from '@/app/dtos';
import { type INotes } from '@/app/model';

class ListNotesUseCase {
  constructor(private readonly notesRepository: INotesRepository) {}

  execute = async ({ userId, title, tags }: IGetNoteDetails): Promise<INotes[]> => {
    const notes = await this.notesRepository.listNotes({ userId, title, tags });
    return notes;
  };
}
export { ListNotesUseCase };
