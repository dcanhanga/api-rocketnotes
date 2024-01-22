import { generateStorageUrl, upload } from './utils';

export const importAvatar = async ({ avatarName, imageToSave }: IImportAvatar): Promise<IUrls> => {
  const storageUrl = generateStorageUrl();
  const avatarPath = `${storageUrl}/${avatarName}`;

  const urls = await upload({ avatarPath, storageUrl, imageToSave });
  return urls;
};
