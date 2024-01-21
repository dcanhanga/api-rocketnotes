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
