import { type ICreateTagsDTO } from '@/app/dtos';
import { type ITags } from '@/app/model';

export interface ITagsRepository {
  createTags: ({ noteId, tags, userId }: ICreateTagsDTO) => Promise<void>;
  listTags: (noteId: string) => Promise<ITags[]>;
}
