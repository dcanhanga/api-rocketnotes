export interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
}
export interface IUpdateUsersDTO {
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
  id?: string;
  avatar_url?: string | null;
  storage_url?: string | null;
}
