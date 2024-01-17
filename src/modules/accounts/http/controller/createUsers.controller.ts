import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { type ICreateUsersDTO } from '../../dtos';
import { CreateUsersUseCase } from '../../useCases/createUsers.useCase';

import { createUsersBodySchema } from '@/shared/validations/zod';

class CreateUsersController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const createUserUseCase = container.resolve(CreateUsersUseCase);

    const data: ICreateUsersDTO = {
      ...createUsersBodySchema.parse(request.body)
    };
    data.avatar_url = request.user?.avatarUrl;
    data.storage_url = request.user?.storageUrl;

    await createUserUseCase.execute(data);

    return response.status(201).send();
  };
}

export const createUsersController = new CreateUsersController();
