import { type Response, type Request } from 'express';

import { makeGateNoteDetails } from '@/app/server/useCases/factories/make-get-noteDetails-useCase';

export class ExpressGetNoteDetailsController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const getNoteDetailsUseCase = makeGateNoteDetails();
    const { id } = request.params;

    const notes = await getNoteDetailsUseCase.execute(id);
    return response.status(200).json(notes);
  };
}
