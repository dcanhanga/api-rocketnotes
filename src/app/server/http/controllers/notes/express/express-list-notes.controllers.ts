import { type Request, type Response } from 'express';

import { makeListNote } from '@/app/server/useCases/factories/make-list-notes';
import { listNotesQuerySchema } from '@/shared/validations/zod';

export class ExpressListNotesController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const listNotesUseCase = makeListNote();
    const userId = request.user.id;
    const { tags, title } = { ...listNotesQuerySchema.parse(request.query) };

    const notes = await listNotesUseCase.execute({ userId, title, tags });
    return response.status(200).json({ notes });
  };
}
