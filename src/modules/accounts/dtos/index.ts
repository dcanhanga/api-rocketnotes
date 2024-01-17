export interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  storage_url?: string;
}
export interface IUpdateUsersDTO {
  name?: string;
  email?: string;
  password?: string;
  old_password: string;
  id?: string;
  avatar_url?: string;
  storage_url?: string;
}
