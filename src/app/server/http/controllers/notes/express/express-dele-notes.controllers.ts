import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols';

import { makeDeleteNote } from '@/app/server/useCases/factories/make-delete-notes';

export class ExpressDeleteNoteController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const deleteNotesUseCase = makeDeleteNote();
    const { id } = request.params;

    await deleteNotesUseCase.execute(id);
    return response.status(200).json({ message: 'Nota deletada com sucesso' });
  };
}
