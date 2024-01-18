interface IUrls {
  avatarUrl: string;
  storageUrl: string;
}
interface IImportAvatar {
  avatarName: string;
  imageToSave: Express.Multer.File;
}
