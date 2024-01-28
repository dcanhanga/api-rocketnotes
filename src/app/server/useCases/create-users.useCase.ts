import { hash } from 'bcrypt';

import { type IUsersRepository } from '../repositories/protocols/IUsersRepository';

import { knex } from '@/app/database/knex';
import { type ICreateUsersDTO } from '@/app/dtos';
import { type IUser } from '@/app/model/users';
import { AppError } from '@/shared/errors/appError';
import { importAvatar } from '@/shared/services/firebase';

interface ICreateUserControllerExecute {
  file: Express.Multer.File | undefined;
  data: ICreateUsersDTO;
}

export class CreateUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  execute = async ({ data, file }: ICreateUserControllerExecute): Promise<void> => {
    const emailAlreadyExists = await this.usersRepository.findByEmail(data.email);
    const avatarUrls: IUrls = { avatarUrl: null, storageUrl: null };
    if (emailAlreadyExists) {
      throw new AppError('Este e-mail já está cadastrado', 409);
    }

    const passwordHash = await hash(data.password, 6);
    if (file) {
      const imageToSave = file;
      const avatarName = `avatar.${file?.originalname.split('.').pop()}`;
      const { avatarUrl, storageUrl } = await importAvatar({ imageToSave, avatarName });
      avatarUrls.avatarUrl = avatarUrl;
      avatarUrls.storageUrl = storageUrl;
    }
    const newUser: IUser = {
      name: data.name,
      email: data.email,
      avatar_url: avatarUrls.avatarUrl,
      storage_url: avatarUrls.storageUrl,
      password_hash: passwordHash
    };

    await knex.table('users').insert(newUser);
  };
}
