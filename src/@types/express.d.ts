declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    // file: {
    //   firebaseUrl?: string;
    // } & Express.Multer.File;
    // storage_url?: string;
    // user: {
    //   id: string;
    // };
    user: {
      id?: string;
      avatarUrl?: string;
      storageUrl?: string;
    };
  }
}
