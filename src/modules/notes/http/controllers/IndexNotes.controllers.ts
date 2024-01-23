import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { IndexNotesUseCase } from '../../useCases/indexNotes.useCase';

class IndexNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const indexNotesUseCase = container.resolve(IndexNotesUseCase);
    const userId = request.user.id;

    const notes = await indexNotesUseCase.execute(userId);
    return response.status(200).json({ notes });
  };
}
export const indexNotesController = new IndexNotesController();
