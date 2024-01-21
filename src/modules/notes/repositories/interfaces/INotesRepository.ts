import { type ICreateLinksDTO, type ICreateNotesDTO, type ICreateTagsDTO } from '../../dtos';

import { type INotes } from '@/modules/accounts/model/notes';

export interface INotesRepository {
  findByTitle: (title: string) => Promise<INotes | undefined>;
  createNote: ({ description, title }: ICreateNotesDTO) => Promise<string>;
  createTags: ({ noteId, tags, userId }: ICreateTagsDTO) => Promise<void>;
  createLinks: ({ links, noteId }: ICreateLinksDTO) => Promise<void>;
}
