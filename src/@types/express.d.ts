declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    file: {
      firebaseUrl?: string;
    } & Express.Multer.File;
  }
}
