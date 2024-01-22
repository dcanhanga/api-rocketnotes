import { type ICreateLinksDTO, type ICreateNotesDTO, type ICreateTagsDTO } from '../../dtos';

import { type ITags, type INotes, type ILinks } from '@/modules/notes/model/notes';

export interface INotesRepository {
  findByTitle: (title: string) => Promise<INotes | undefined>;
  createNote: ({ description, title }: ICreateNotesDTO) => Promise<string>;
  createTags: ({ noteId, tags, userId }: ICreateTagsDTO) => Promise<void>;
  createLinks: ({ links, noteId }: ICreateLinksDTO) => Promise<void>;
  listTags: (note_id: string) => Promise<ITags[]>;
  listLinks: (noteId: string) => Promise<ILinks[]>;
  listNote: (id: string) => Promise<INotes | undefined>;
}
