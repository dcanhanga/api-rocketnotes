/* eslint-disable no-console */

import { type File } from '@google-cloud/storage';
import { type NextFunction, type Response, type Request } from 'express';

import { UsersRepository } from '@/modules/accounts/repositories/implementations/users';
import { AppError } from '@/shared/errors/appError';
import { STORAGE_BUCKET, firebase } from '@/shared/services/firebase';

interface ISaveAvatar {
  avatarFirebasePath: string;
  storageUrl: string;
  imageToSave: Express.Multer.File;
  request: Request;
  next: NextFunction;
}

const findAvatarImage = async (firebaseFolder: string): Promise<File[]> => {
  const [files] = await firebase.getFiles({ prefix: firebaseFolder });

  const imageFiles = files.filter(file => {
    const imageContentTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const images = file.metadata.contentType;
    if (!images) {
      return false;
    }
    return imageContentTypes.includes(images);
  });

  return imageFiles.filter(image => image.name.includes('avatar'));
};

const deleteImageFiles = async (imageFiles: File[]): Promise<void> => {
  for (const file of imageFiles) {
    try {
      await file.delete();
      console.log(`Arquivo ${file.name} excluído com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir o arquivo ${file.name}:`, error);
    }
  }
};

const saveAvatar = async ({
  avatarFirebasePath,
  imageToSave,
  request,
  storageUrl
}: ISaveAvatar): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const file = firebase.file(avatarFirebasePath);

    const stream = file.createWriteStream({
      metadata: { contentType: imageToSave.mimetype }
    });

    stream.on('error', error => {
      console.error(error.message);
      reject(error);
    });

    stream.on('finish', async () => {
      try {
        await file.makePublic();
        request.user.avatarUrl = file.publicUrl();
        request.user.storageUrl = request.body.storage_url ?? storageUrl;
        console.log(
          request.user,
          request.user.avatarUrl,
          'estou no middleware devo ser chamado antes do controller'
        );
        resolve();
      } catch (error) {
        console.error('Erro ao tornar o arquivo público:', error);
        reject(error);
      }
    });

    stream.end(imageToSave.buffer);
  });
};

const generateStorageUrl = (): string => {
  const nanoseconds = process.hrtime.bigint();
  const uniqueId = nanoseconds.toString();
  return `https://storage.googleapis.com/${STORAGE_BUCKET}/${uniqueId}`;
};

const checkEmail = async (email: string): Promise<void> => {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findByEmail(email);
  if (user) {
    throw new AppError('Este e-mail já está cadastrado', 409);
  }
};

export const uploadImage = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  if (!request.file) {
    next();
    return;
  }

  console.log('Middleware uploadImage called');

  const imageToSave = request.file;
  const avatarName = `avatar.${imageToSave.originalname.split('.').pop()}`;

  if (!request.user) {
    request.user = {};
  }

  if (request.body.storage_url) {
    try {
      const imageFiles = await findAvatarImage(
        request.body.storage_url as string
      );

      if (imageFiles && imageFiles.length > 0) {
        await deleteImageFiles(imageFiles);
      }

      const avatarFirebasePath = `${request.body.storage_url}/${avatarName}`;
      const storageUrl = request.body.storage_url as string;
      await saveAvatar({
        avatarFirebasePath,
        storageUrl,
        request,
        next,
        imageToSave
      });

      next();
    } catch (error) {
      console.error('Erro ao processar o novo avatar:', error);
      next(error);
    }
  }
  const email = request.body.email;
  if (email) {
    await checkEmail(email as string);
  }

  try {
    const storageUrl = generateStorageUrl();
    const avatarFirebasePath = `${storageUrl}/${avatarName}`;
    await saveAvatar({
      avatarFirebasePath,
      storageUrl,
      request,
      next,
      imageToSave
    });

    next();
  } catch (error) {
    console.error('Erro ao processar o novo avatar:', error);
    next(error);
  }
};
