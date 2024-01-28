import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols';

import { type INotesDTO } from '@/app/dtos';
import { makeCreateNotes } from '@/app/server/useCases/factories/make-create-notes-useCase';
import { createNotesBodySchema } from '@/shared/validations/zod';
export class ExpressCreateNotesController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const data: INotesDTO = { ...createNotesBodySchema.parse(request.body) };
    const createNotesUseCase = makeCreateNotes();
    data.userId = request.user.id;
    await createNotesUseCase.execute(data);
    return response.status(201).json({ message: `Nota ${data.title} criada com sucesso` });
  };
}
