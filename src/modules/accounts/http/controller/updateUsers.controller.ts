import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { type IUpdateUsersDTO } from '../../dtos';
import { UpdateUsersUseCase } from '../../useCases/updateUsers.useCase';

import { updateUsersBodySchema } from '@/shared/validations/zod';
class UpdateUsersController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const updateUsersUseCase = container.resolve(UpdateUsersUseCase);
    const data: IUpdateUsersDTO = {
      ...updateUsersBodySchema.parse(request.body)
    };
    data.id = request.user.id;
    data.avatar_url = request.user.avatarUrl;
    data.storage_url = request.user.storageUrl;

    await updateUsersUseCase.execute(data);
    return response.json({ data });
  };
}
export const updateUsersController = new UpdateUsersController();
