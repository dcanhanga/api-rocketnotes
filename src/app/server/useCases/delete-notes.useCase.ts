import { type INotesRepository } from '../repositories/protocols';

class DeleteNotesUseCase {
  constructor(private readonly notesRepository: INotesRepository) {}

  execute = async (noteId: string): Promise<void> => {
    await this.notesRepository.deleteNote(noteId);
  };
}
export { DeleteNotesUseCase };
