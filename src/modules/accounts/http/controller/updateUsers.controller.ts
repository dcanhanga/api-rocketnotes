import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { type IUpdateUsersDTO } from '../../dtos';
import { UpdateUsersUseCase } from '../../useCases/updateUsers.useCase';

import { isImageExtensionValid } from '@/shared/validations/isImageExtensionValid';
import { updateUsersBodySchema } from '@/shared/validations/zod';
class UpdateUsersController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const updateUsersUseCase = container.resolve(UpdateUsersUseCase);
    const data: IUpdateUsersDTO = {
      ...updateUsersBodySchema.parse(request.body)
    };
    data.id = request.user.id;
    isImageExtensionValid(request.file);
    const file = request.file;
    await updateUsersUseCase.execute({ data, file });
    return response.json({ data });
  };
}
export const updateUsersController = new UpdateUsersController();
