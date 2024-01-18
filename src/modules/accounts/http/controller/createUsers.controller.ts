import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { type ICreateUsersDTO } from '../../dtos';
import { CreateUsersUseCase } from '../../useCases/createUsers.useCase';

import { isImageExtensionValid } from '@/shared/validations/isImageExtensionValid';
import { createUsersBodySchema } from '@/shared/validations/zod';

class CreateUsersController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const createUserUseCase = container.resolve(CreateUsersUseCase);

    const data: ICreateUsersDTO = {
      ...createUsersBodySchema.parse(request.body)
    };
    isImageExtensionValid(request.file);
    const file = request.file;

    await createUserUseCase.execute({ data, file });

    return response.status(201).send();
  };
}

export const createUsersController = new CreateUsersController();
