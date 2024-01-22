import { AppError } from '../errors/appError';

export const isImageExtensionValid = (file: Express.Multer.File | undefined): void => {
  if (file?.originalname) {
    const extension = ['jpg', 'jpeg', 'png'].includes(file.originalname?.split('.').pop() ?? '');

    if (!extension) {
      throw new AppError('O arquivo deve ser uma imagem nos formatos JPG, JPEG ou PNG.');
    }
  }
};
