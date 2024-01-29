import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols';

import { makeListTags } from '@/app/server/useCases/factories/make-list-tags-useCase';

export class ExpressListTagsController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const listTagsUseCase = makeListTags();

    const userId = request.user.id;

    const tags = await listTagsUseCase.execute(userId);
    return response.json({ tags });
  };
}
