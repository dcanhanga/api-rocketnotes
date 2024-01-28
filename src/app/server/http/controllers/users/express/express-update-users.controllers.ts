import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols';

import { type IUpdateUsersDTO } from '@/app/dtos';
import { makeUpdateUserUseCase } from '@/app/server/useCases/factories';
import { isImageExtensionValid } from '@/shared/validations/isImageExtensionValid';
import { updateUsersBodySchema } from '@/shared/validations/zod';
export class ExpressUpdateUsersController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const updateUsersUseCase = makeUpdateUserUseCase();
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
