import { type Response, type Request } from 'express';
import { container } from 'tsyringe';

import { GetNoteDetailsUseCase } from '../../useCases/getNoteDetails.useCase';

class GetNoteDetailsController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const getNoteDetailsUseCase = container.resolve(GetNoteDetailsUseCase);
    const { id } = request.params;

    const notes = await getNoteDetailsUseCase.execute(id);
    return response.status(200).json(notes);
  };
}

export const getNoteDetailsController = new GetNoteDetailsController();
