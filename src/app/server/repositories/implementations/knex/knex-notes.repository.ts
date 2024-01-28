import { type INotesRepository } from '../../protocols';

import { knex } from '@/app/database/knex';
import { type IGetNoteDetails, type ICreateNotesDTO } from '@/app/dtos';
import { type INotes } from '@/app/model';

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

  getNoteDetails = async (id: string): Promise<INotes | undefined> => {
    const note = await knex('notes').where({ id }).first();
    return note;
  };

  deleteNote = async (noteId: string): Promise<void> => {
    await knex('notes').where({ id: noteId }).delete();
  };

  listUserNotes = async ({ userId, title, tags }: IGetNoteDetails): Promise<INotes[]> => {
    if (tags) {
      const listTags = tags.split(',').map(tag => tag.trim());
      const notes = knex('tags')
        .select(['notes.id', 'notes.title', 'notes.user_id'])
        .where('notes.user_id', userId)
        .whereRaw('LOWER(title) LIKE ?', `%${title?.toLowerCase()}%`)
        .whereIn('name', listTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title');
      return await notes;
    }

    const notes = await knex('notes')
      .where({ user_id: userId })
      .whereRaw('LOWER(title) LIKE ?', `%${title?.toLowerCase()}%`)
      .orderBy('title');
    return notes;
  };
}
export { KnexNotesRepository };
