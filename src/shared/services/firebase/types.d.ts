interface IUrls {
  avatarUrl: string | null;
  storageUrl: string | null;
}
interface IImportAvatar {
  avatarName?: string;
  imageToSave: Express.Multer.File;
}
interface IUploadAvatar extends IImportAvatar {
  storageUrl?: string | null;
}
