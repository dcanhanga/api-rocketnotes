import { type Request, type Response } from 'express';

import { makeListNote } from '@/app/server/useCases/factories/make-list-notes';
import { listUserNotesUseCaseQuerySchema } from '@/shared/validations/zod';

export class ExpressListNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const listUserNotesUseCase = makeListNote();
    const userId = request.user.id;
    const { tags, title } = { ...listUserNotesUseCaseQuerySchema.parse(request.query) };

    const notes = await listUserNotesUseCase.execute({ userId, title, tags });
    return response.status(200).json({ notes });
  };
}
