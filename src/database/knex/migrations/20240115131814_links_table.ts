import { type Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('url').notNullable();
    table.uuid('note_id').references('id').inTable('links').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links');
}
