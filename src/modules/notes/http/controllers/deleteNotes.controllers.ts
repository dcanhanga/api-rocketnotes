import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { DeleteNotesUseCase } from '../../useCases/deleteNotes.useCase';
class DeleteNotesControllers {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const deleteNotesUseCase = container.resolve(DeleteNotesUseCase);
    const { id } = request.params;

    await deleteNotesUseCase.execute(id);
    return response.status(200).json({ message: 'Nota deletada com sucesso' });
  };
}
export const deleteNotesControllers = new DeleteNotesControllers();
