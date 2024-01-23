import { type ICreateLinksDTO, type ICreateNotesDTO, type ICreateTagsDTO } from '../../dtos';
import { type ILinks } from '../../model/links';
import { type INotes } from '../../model/notes';
import { type ITags } from '../../model/tags';

export interface INotesRepository {
  findByTitle: (title: string) => Promise<INotes | undefined>;
  createNote: ({ description, title }: ICreateNotesDTO) => Promise<string>;
  createTags: ({ noteId, tags, userId }: ICreateTagsDTO) => Promise<void>;
  createLinks: ({ links, noteId }: ICreateLinksDTO) => Promise<void>;
  listTags: (note_id: string) => Promise<ITags[]>;
  listLinks: (noteId: string) => Promise<ILinks[]>;
  listNote: (id: string) => Promise<INotes | undefined>;
  delete: (noteId: string) => Promise<void>;
  index: (userId: string) => Promise<INotes[]>;
}
