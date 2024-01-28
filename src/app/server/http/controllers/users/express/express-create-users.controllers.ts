import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols';

import { type ICreateUsersDTO } from '@/app/dtos';
import { makeCreateUserUseCase } from '@/app/server/useCases/factories';
import { isImageExtensionValid } from '@/shared/validations/isImageExtensionValid';
import { createUsersBodySchema } from '@/shared/validations/zod';

export class ExpressCreateUsersController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const createUserUseCase = makeCreateUserUseCase();

    const data: ICreateUsersDTO = {
      ...createUsersBodySchema.parse(request.body)
    };
    isImageExtensionValid(request.file);
    const file = request.file;

    await createUserUseCase.execute({ data, file });

    return response.status(201).send();
  };
}
