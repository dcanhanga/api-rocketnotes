import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { type INotesDTO } from '../../dtos';
import { CreateNotesUseCase } from '../../useCases/createNotes.useCase';

import { createNotesBodySchema } from '@/shared/validations/zod';
class CreateNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const data: INotesDTO = { ...createNotesBodySchema.parse(request.body) };
    const createNotesUseCase = container.resolve(CreateNotesUseCase);
    data.userId = request.user.id;
    await createNotesUseCase.execute(data);
    return response.status(201).json({ message: `Nota ${data.title} criada com sucesso` });
  };
}
export const createNotesController = new CreateNotesController();
