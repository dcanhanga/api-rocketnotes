export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
