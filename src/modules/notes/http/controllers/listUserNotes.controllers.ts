import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListUserNotesUseCase } from '../../useCases/listUserNotes.useCase';

import { listUserNotesUseCaseQuerySchema } from '@/shared/validations/zod';

class ListUserNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const listUserNotesUseCase = container.resolve(ListUserNotesUseCase);
    const userId = request.user.id;
    const { tags, title } = { ...listUserNotesUseCaseQuerySchema.parse(request.query) };

    const notes = await listUserNotesUseCase.execute({ userId, title, tags });
    return response.status(200).json({ notes });
  };
}
export const listUserNotesController = new ListUserNotesController();
