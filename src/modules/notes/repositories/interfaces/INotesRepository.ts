import {
  type IGetNoteDetails,
  type ICreateLinksDTO,
  type ICreateNotesDTO,
  type ICreateTagsDTO
} from '../../dtos';
import { type ILinks } from '../../model/links';
import { type INotes } from '../../model/notes';
import { type ITags } from '../../model/tags';

export interface INotesRepository {
  findByTitle: (title: string) => Promise<INotes | undefined>;
  createNote: ({ description, title }: ICreateNotesDTO) => Promise<string>;
  createTags: ({ noteId, tags, userId }: ICreateTagsDTO) => Promise<void>;
  createLinks: ({ links, noteId }: ICreateLinksDTO) => Promise<void>;
  listTags: (noteId: string) => Promise<ITags[]>;
  listLinks: (noteId: string) => Promise<ILinks[]>;
  getNoteDetails: (noteId: string) => Promise<INotes | undefined>; // Renomeei para "getNoteDetails" para indicar que retorna detalhes específicos de uma nota.
  deleteNote: (noteId: string) => Promise<void>; // Renomeei para "deleteNote" para indicar que o método deleta uma nota específica.
  listUserNotes: ({ userId, title, tags }: IGetNoteDetails) => Promise<INotes[]>; // Renomeei para "listUserNotes" para indicar que o método lista todas as notas de um usuário.
}
