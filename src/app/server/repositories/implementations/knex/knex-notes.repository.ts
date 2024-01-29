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

  listNotes = async ({ userId, title, tags }: IGetNoteDetails): Promise<INotes[]> => {
    let notesQuery = knex('notes')
      .select(['notes.id', 'notes.title', 'notes.user_id'])
      .distinct()
      .where('notes.user_id', userId)
      .whereNotNull('notes.title');

    if (title) {
      notesQuery = notesQuery.whereRaw('LOWER(title) LIKE ?', `%${title.toLowerCase()}%`);
    }

    if (tags) {
      const listTags = tags.split(',').map(tag => tag.trim());
      const tagsQuery = knex('tags')
        .select('note_id')
        .whereIn('name', listTags)
        .andWhere('user_id', userId);

      notesQuery = notesQuery.whereIn('id', tagsQuery);
    }

    const notes = await notesQuery.orderBy('title');

    const userTags = await knex('tags').where({ user_id: userId });

    const notesWithTags = notes.map(note => {
      const notesTags = userTags.filter(tag => tag.note_id === note.id);
      return { ...note, tags: notesTags };
    });

    return notesWithTags;
  };
}
export { KnexNotesRepository };
