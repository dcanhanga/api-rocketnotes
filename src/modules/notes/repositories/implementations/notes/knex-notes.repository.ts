import { type INotesRepository } from '../../interfaces/INotesRepository';

import { knex } from '@/database/knex';
import { type INotes } from '@/modules/accounts/model/notes';
import {
  type ICreateTagsDTO,
  type ICreateLinksDTO,
  type ICreateNotesDTO
} from '@/modules/notes/dtos';

class KnexNotesRepository implements INotesRepository {
  findByTitle = async (title: string): Promise<INotes | undefined> => {
    const note = await knex('notes').where({ title }).first();
    return note;
  };

  createNote = async ({ description, title, userId }: ICreateNotesDTO): Promise<string> => {
    const [note] = await knex('notes')
      .insert({ title, description, user_id: userId })
      .returning(['id']);

    return note.id!;
  };

  createLinks = async ({ links, noteId }: ICreateLinksDTO): Promise<void> => {
    const linksToInsert = links.map(link => ({ note_id: noteId, url: link }));
    await knex('links').insert(linksToInsert);
  };

  createTags = async ({ noteId, tags, userId }: ICreateTagsDTO): Promise<void> => {
    const tagsToInsert = tags.map(name => ({
      note_id: noteId,
      name,
      user_id: userId
    }));
    await knex('tags').insert(tagsToInsert);
  };
}
export { KnexNotesRepository };
