import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '../repositories/interfaces/INotesRepository';

@injectable()
class DeleteNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private readonly notesRepository: INotesRepository
  ) {}

  execute = async (noteId: string): Promise<void> => {
    await this.notesRepository.deleteNote(noteId);
  };
}
export { DeleteNotesUseCase };
