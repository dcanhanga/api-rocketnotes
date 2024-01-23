import { type INotesRepository } from '../../interfaces/INotesRepository';

import { knex } from '@/database/knex';
import {
  type ICreateTagsDTO,
  type ICreateLinksDTO,
  type ICreateNotesDTO
} from '@/modules/notes/dtos';
import { type ILinks } from '@/modules/notes/model/links';
import { type INotes } from '@/modules/notes/model/notes';
import { type ITags } from '@/modules/notes/model/tags';

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

  listNote = async (id: string): Promise<INotes | undefined> => {
    const note = await knex('notes').where({ id }).first();
    return note;
  };

  listTags = async (noteId: string): Promise<ITags[]> => {
    const tags = await knex('tags').where({ note_id: noteId }).orderBy('name');
    return tags;
  };

  listLinks = async (noteId: string): Promise<ILinks[]> => {
    const links = await knex('links').where({ note_id: noteId }).orderBy('created_at');
    return links;
  };

  delete = async (noteId: string): Promise<void> => {
    await knex('notes').where({ id: noteId }).delete();
  };
}
export { KnexNotesRepository };
