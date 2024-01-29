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
export interface ICreateNotesDTO {
  title: string;
  description: string;
  userId: string;
}
