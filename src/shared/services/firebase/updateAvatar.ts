import { importAvatar } from './importAvatar';
import { deleteImageFiles, findAvatarImage, upload } from './utils';

export const updateAvatar = async ({
  avatarName,
  imageToSave,
  storageUrl
}: IUploadAvatar): Promise<IUrls | undefined> => {
  if (!storageUrl) {
    const url = await importAvatar({ avatarName, imageToSave });
    return url;
  }

  const file = await findAvatarImage(storageUrl);
  const hasFile = file.length > 0;
  if (hasFile) {
    return;
  }

  await deleteImageFiles(file);
  const avatarPath = `${storageUrl}/${avatarName}`;
  const urls = await upload({ avatarPath, storageUrl, imageToSave });

  return urls;
};
