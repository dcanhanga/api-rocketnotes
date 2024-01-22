/* eslint-disable no-console */
import { type File } from '@google-cloud/storage';

import { STORAGE_BUCKET, firebase, storageGoogleApisUrl } from '.';
interface IUpload {
  avatarPath: string;
  storageUrl: string;
  imageToSave: Express.Multer.File;
}

export const upload = async ({ avatarPath, imageToSave, storageUrl }: IUpload): Promise<IUrls> => {
  return await new Promise<IUrls>((resolve, reject) => {
    const file = firebase.file(avatarPath);

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
        const avatarUrl = file.publicUrl();

        resolve({ avatarUrl, storageUrl });
      } catch (error) {
        console.error('Erro ao tornar o arquivo público:', error);
        reject(error);
      }
    });

    stream.end(imageToSave.buffer);
  });
};

export const findAvatarImage = async (firebaseFolder: string): Promise<File[]> => {
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

export const deleteImageFiles = async (imageFiles: File[]): Promise<void> => {
  for (const file of imageFiles) {
    try {
      await file.delete();
      console.log(`Arquivo ${file.name} excluído com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir o arquivo ${file.name}:`, error);
    }
  }
};
export const generateStorageUrl = (): string => {
  const nanoseconds = process.hrtime.bigint();
  const uniqueId = nanoseconds.toString();
  return `${storageGoogleApisUrl}/${STORAGE_BUCKET}/${uniqueId}`;
};
