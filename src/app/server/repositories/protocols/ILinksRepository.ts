import { type ICreateLinksDTO } from '@/app/dtos';
import { type ILinks } from '@/app/model';

export interface ILinksRepository {
  createLinks: ({ links, noteId }: ICreateLinksDTO) => Promise<void>;
  listLinks: (noteId: string) => Promise<ILinks[]>;
}
