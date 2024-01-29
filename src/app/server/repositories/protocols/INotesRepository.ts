import { type ICreateNotesDTO, type IGetNoteDetails } from '@/app/dtos';
import { type INotes } from '@/app/model';

export interface INotesRepository {
  findByTitle: (title: string) => Promise<INotes | undefined>;
  createNote: ({ description, title }: ICreateNotesDTO) => Promise<string>;
  getNoteDetails: (noteId: string) => Promise<INotes | undefined>;
  deleteNote: (noteId: string) => Promise<void>;
  listNotes: ({ userId, title, tags }: IGetNoteDetails) => Promise<INotes[]>;
}
