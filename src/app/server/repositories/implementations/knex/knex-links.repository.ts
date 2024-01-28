import { type ILinksRepository } from '../../protocols';

import { knex } from '@/app/database';
import { type ICreateLinksDTO } from '@/app/dtos';
import { type ILinks } from '@/app/model';

export class KnexLinksRepository implements ILinksRepository {
  createLinks = async ({ links, noteId }: ICreateLinksDTO): Promise<void> => {
    const linksToInsert = links.map(link => ({ note_id: noteId, url: link }));
    await knex('links').insert(linksToInsert);
  };

  listLinks = async (noteId: string): Promise<ILinks[]> => {
    const links = await knex('links').where({ note_id: noteId }).orderBy('created_at');
    return links;
  };
}
