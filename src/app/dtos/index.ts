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
export interface ICreateNotesDTO {
  title: string;
  description: string;
  userId: string;
}
export interface ICreateLinksDTO {
  links: string[];
  noteId: string;
}
export interface ICreateTagsDTO {
  tags: string[];
  userId: string;
  noteId: string;
}
export interface INotesDTO {
  userId?: string;
  title: string;
  description: string;
  tags: string[];
  links?: string[];
}
export interface IGetNoteDetails {
  userId: string;
  title?: string;
  tags?: string;
}
