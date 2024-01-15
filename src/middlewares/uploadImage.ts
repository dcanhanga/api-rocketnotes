/* eslint-disable no-console */
import { type File } from '@google-cloud/storage';
import { type NextFunction, type Response, type Request } from 'express';

import { UsersRepository } from '@/modules/accounts/repositories/implementations/users';
import { AppError } from '@/shared/errors/appError';
import { STORAGE_BUCKET, firebase } from '@/shared/services/firebase';

const saveAvatar = async (
  avatarFirebasePath: string,
  storageUrl: string,
  image: { firebaseUrl?: string } & Express.Multer.File,
  request: Request,
  next: NextFunction
): Promise<void> => {
  const file = firebase.file(avatarFirebasePath);

  const stream = file.createWriteStream({
    metadata: { contentType: image.mimetype }
  });

  stream.on('error', error => {
    console.error(error.message);
    next(error);
  });

  stream.on('finish', async () => {
    try {
      await file.makePublic();
      request.file.firebaseUrl = file.publicUrl();
      request.body.storage_url = request.body.storage_url ?? storageUrl;

      next();
    } catch (error) {
      console.error('Erro ao tornar o arquivo público:', error);
      next(error);
    }
  });

  stream.end(image.buffer);
};

const deleteExistingAvatar = async (existingAvatar: File): Promise<void> => {
  try {
    await existingAvatar.delete();
  } catch (error) {
    console.error('Erro ao excluir o avatar existente:', error);
    throw new Error('Erro ao excluir o avatar existente');
  }
};

const generateStorageUrl = (): string => {
  const nanoseconds = process.hrtime.bigint();
  const uniqueId = nanoseconds.toString();
  return `https://storage.googleapis.com/${STORAGE_BUCKET}/${uniqueId}`;
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

  const image = request.file;
  const avatarName = `avatar.${image.originalname.split('.').pop()}`;

  if (request.body.storage_url) {
    const existingAvatar = firebase.file(
      `${request.body.storage_url}/${avatarName}`
    );
    const [existingFiles] = await existingAvatar.get();

    if (existingFiles.name) {
      try {
        await deleteExistingAvatar(existingAvatar);
        const avatarFireBasePath = `${request.body.storage_url}/${avatarName}`;
        await saveAvatar(
          avatarFireBasePath,
          request.body.storage_url as string,
          image,
          request,
          next
        );
      } catch (error) {
        console.error('Erro ao processar o avatar existente:', error);
        next(error);
      }
    }
  } else {
    const email = request.body.email;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(email as string);
    if (user) {
      throw new AppError('Email areadyExists.', 401);
    }
    try {
      const storageUrl = generateStorageUrl();
      const avatarFireBasePath = `${storageUrl}/${avatarName}`;
      await saveAvatar(avatarFireBasePath, storageUrl, image, request, next);
    } catch (error) {
      console.error('Erro ao processar o novo avatar:', error);
      next(error);
    }
  }
};
