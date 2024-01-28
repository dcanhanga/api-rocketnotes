import { compare, hash } from 'bcrypt';

import { type IUsersRepository } from '../repositories/protocols';

import { type IUpdateUsersDTO } from '@/app/dtos';
import { AppError } from '@/shared/errors/appError';
import { updateAvatar } from '@/shared/services/firebase';

interface IUpdateUsers {
  file: Express.Multer.File | undefined;
  data: IUpdateUsersDTO;
}
interface IUpdateOnlyAvatar extends IUpdateUsers {
  avatarName: string;
}

export class UpdateUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  private readonly checkID = (id?: string): void => {
    if (!id) {
      // eslint-disable-next-line no-console
      console.error(
        'ID not find, mistake to replace id in  ensureAuthenticated to UpdateUsersController'
      );
      throw new Error('');
    }
  };

  private readonly updateOnlyAvatar = async ({
    file,
    avatarName,
    data
  }: IUpdateOnlyAvatar): Promise<void> => {
    const { id } = data;
    try {
      const urls = await updateAvatar({
        avatarName,
        imageToSave: file!,
        storageUrl: data.storage_url
      });
      if (urls) {
        await this.usersRepository.update(id!, {
          storage_url: urls.storageUrl,
          avatar_url: urls.avatarUrl,
          updated_at: new Date()
        });
      }
    } catch (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error}`);
    }
  };

  private readonly checkPassword = async (
    old_password: string,
    password_hash: string
  ): Promise<void> => {
    const passwordMatch = await compare(old_password, password_hash);
    if (!passwordMatch) {
      throw new AppError('A senha antiga não confere');
    }
  };

  private readonly checkEmail = async (email?: string, id?: string): Promise<void> => {
    if (email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
        throw new AppError('Este email já em uso', 409);
      }
    }
  };

  execute = async ({ data, file }: IUpdateUsers): Promise<undefined> => {
    const { email, name, old_password, password, avatar_url, id, storage_url } = data;
    const avatarName = `avatar.${file?.originalname.split('.').pop()}`;

    if (file && !email) {
      this.checkID(id);
      await this.updateOnlyAvatar({ file, data, avatarName });
      return;
    }

    if (!old_password) {
      throw new AppError('Você precisa inserir a password antiga para alterar os seus dados');
    }

    this.checkID(id);
    const user = await this.usersRepository.findById(id!);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    await this.checkPassword(old_password, user.password_hash);

    await this.checkEmail(email, id);
    if (file) {
      const urls = await updateAvatar({
        avatarName,
        imageToSave: file,
        storageUrl: storage_url
      });
      if (urls) {
        data.avatar_url = urls.avatarUrl;
        data.storage_url = urls.storageUrl;
      }
    }
    if (password && old_password) {
      user.password_hash = await hash(password, 6);
    }

    await this.usersRepository.update(id!, {
      name: name ?? user.name,
      email: email ?? user.email,
      storage_url: storage_url ?? user.storage_url,
      avatar_url: avatar_url ?? user.avatar_url,
      password_hash: user.password_hash,
      updated_at: new Date()
    });
  };
}
