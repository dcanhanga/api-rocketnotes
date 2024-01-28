export interface IUser {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string | null;
  storage_url?: string | null;
  created_at?: string | Date;
  updated_at?: string | Date;
}
