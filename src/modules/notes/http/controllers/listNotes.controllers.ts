import { type Response, type Request } from 'express';
import { container } from 'tsyringe';

import { ListNotesUseCase } from '../../useCases/listNotes.useCase';

class ListNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const listNotesUseCase = container.resolve(ListNotesUseCase);
    const { id } = request.params;

    const notes = await listNotesUseCase.execute(id);
    return response.status(200).json(notes);
  };
}

export const listNotesController = new ListNotesController();
