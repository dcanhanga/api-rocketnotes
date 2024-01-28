import { type ITagsRepository } from '../../protocols/ITagsRepository';

import { knex } from '@/app/database';
import { type ICreateTagsDTO } from '@/app/dtos';
import { type ITags } from '@/app/model';

export class KnexTagsRepository implements ITagsRepository {
  createTags = async ({ noteId, tags, userId }: ICreateTagsDTO): Promise<void> => {
    const tagsToInsert = tags.map(name => ({
      note_id: noteId,
      name,
      user_id: userId
    }));
    await knex('tags').insert(tagsToInsert);
  };

  listTags = async (noteId: string): Promise<ITags[]> => {
    const tags = await knex('tags').where({ note_id: noteId }).orderBy('name');
    return tags;
  };
}
